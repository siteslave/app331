angular.module('app.controllers.report.New', ['app.services.Reporter'])
  .controller('ReportNewCtrl', function($scope, $rootScope, ReportService, $window, $ionicLoading,
     $state, $cordovaCamera, $ionicPopup) {

    if (!$window.sessionStorage.getItem('logged')) {
      $state.go('login')
    }

    // Get ampur
    ReportService.getAmp($rootScope.serverUrl, $rootScope.apiKey)
    .then(function (rows) {
      $scope.ampur = rows;
    });

    $scope.getTambol = function () {
      $scope.offices = [];
      $scope.tambol = [];
      $ionicLoading.show({
        template: '<ion-spinner icon="android"></ion-spinner>'
      });
      ReportService.getTambol($rootScope.serverUrl, $rootScope.apiKey, $scope.service.amp)
      .then(function (rows) {
        $scope.tambol = rows;
        $ionicLoading.hide();
      })
    };

    $scope.getOffice = function () {
      $ionicLoading.show({
        template: '<ion-spinner icon="android"></ion-spinner>'
      });
      ReportService.getOffice($rootScope.serverUrl, $rootScope.apiKey, $scope.service.tmb)
      .then(function (rows) {
        $scope.offices = rows;
        $ionicLoading.hide();
      })
    };
    $scope.$on('$ionicView.enter', function(){
      $scope.img = null;
      $scope.service = {};
      $scope.service.img_data = '';
    });

    $scope.takePicture = function() {
      var options = {
        quality: 60,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {

        $scope.service.img_data = imageData;
        $scope.img = "data:image/jpeg;base64," + imageData;

      }, function(err) {
        // error
        alert(JSON.stringify(err))
      });
    };

    $scope.saveReport = function() {
      if ($scope.service.date_serv && $scope.service.amp && $scope.service.tmb && $scope.service.office) {
        $scope.service.date_serv = moment($scope.service.date_serv).format('YYYY-MM-DD');

        $ionicLoading.show({
          template: '<ion-spinner icon="android"></ion-spinner>'
        });

        ReportService.saveReport($rootScope.serverUrl, $rootScope.apiKey, $scope.service)
          .then(function() {
            $ionicLoading.hide();
            $state.go('report.main');
          }, function(err) {
            $ionicLoading.hide();
            var err = JSON.stringify(err);
            $ionicPopup.alert({
             title: 'เกิดข้อผิดพลาด',
             template: err
           });
          })
      } else {
        alert('กรุณาระบุข้อมูลให้ครบถ้วน')
      }

    }
  })
