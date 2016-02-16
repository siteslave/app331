angular.module('app.controllers.Login', ['app.services.Login'])
.controller('LoginCtrl', function ($scope, $rootScope, $state, $ionicLoading,
  $window, $cordovaDevice, $ionicPopup, LoginService) {

  $scope.deviceModel = $cordovaDevice.getModel();
  $scope.devicePlatform = $cordovaDevice.getPlatform();

  $scope.doLogin = function () {
    if ($scope.username && $scope.password) {
      $ionicLoading.show({
        template: '<ion-spinner icon="android"></ion-spinner>'
      });
      LoginService.login($rootScope.serverUrl, $scope.username, $scope.password, $rootScope.apiKey)
      .then(function (user) {
        // console.log(JSON.stringify(user));
        // alert('Success')
        $window.sessionStorage.setItem('logged', true);
        $window.sessionStorage.setItem('username', user.username);
        $window.sessionStorage.setItem('fullname', user.fullname);
        $window.sessionStorage.setItem('user_mode', user.user_mode);
        $window.sessionStorage.setItem('off_id', user.off_id);

        $scope.sendRegisterId(user.user_mode);

        $ionicLoading.hide();
      }, function (err) {
        $ionicLoading.hide();
        $ionicPopup.alert({
          title: 'ไม่สามารถเข้าสู่ระบบได้',
          template: 'Error: ' + JSON.stringify(err)
        });
      })
    } else {
      alert('Please enter username and password')
    }
  };

  $scope.sendRegisterId = function (user_mode) {
    var push = PushNotification.init({
      android: {
        senderID: "186962992070"
      },
      ios: {
        alert: "true",
        badge: "true",
        sound: "true"
      },
      windows: {}
    });

    push.on('registration', function(data) {
      console.log(data);
      LoginService.sendRegisterId($rootScope.serverUrl, $rootScope.apiKey, $scope.username, data.registrationId, $scope.deviceModel, $scope.devicePlatform)
      .then(function (data) {
        console.log(data);
        if (user_mode == 1) {
          $state.go('report.main');
        } else {
          $state.go('srrt.main');
        }

      }, function (err) {
        alert('failed')
      });
    });

    push.on('notification', function(data) {
      $ionicPopup.alert({
        title: data.title,
        template: data.message
      });
      //alert(JSON.stringify(data));
      console.log(data);
    });

  }
});
