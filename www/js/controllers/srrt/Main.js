angular.module('app.controllers.srrt.Main', ['app.services.Srrt'])
  .controller('SRRTMainCtrl', function($scope, $rootScope, $state, $window,
    $ionicLoading, $ionicPopup, SRRTService) {

    $scope.off_id = $window.sessionStorage.getItem('off_id');

    $scope.$on('$ionicView.enter', function() {
      if (!$window.sessionStorage.getItem('logged')) {
        $state.go('intro');
      }

      $scope.$on('$ionicView.enter', function() {
        $scope.getList();
      });
    });

    $scope.getList = function() {
        // get list
        $ionicLoading.show({
          template: '<ion-spinner icon="android"></ion-spinner>'
        });
        SRRTService.getList($rootScope.serverUrl, $rootScope.apiKey, $scope.off_id)
          .then(function(rows) {
            $rootScope.badgeNew = rows.length;
            $scope.services = [];
            rows.forEach(function(v) {
              var obj = {};
              obj.id = v.id;
              obj.sex = v.sex == '1' ? 'ชาย' : 'หญิง';
              obj.date_serv = moment(v.date_serv).format('DD/MM/YYYY')
              obj.report_date = moment(v.report_date_0).format('DD/MM/YYYY HH:mm:ss');
              obj.img = v.img_report_0;
              $scope.services.push(obj);
            });
            $ionicLoading.hide()
          }, function(err) {
            $ionicLoading.hide();
            alert(JSON.stringify(err));
          });
      }
      // Initial list
    $scope.getList();

    $scope.logout = function() {
      var confirmPopup = $ionicPopup.confirm({
        title: 'Are you sure?',
        template: 'คุณต้องการจะออกจากโปรแกรมใช่หรือไม่?'
      });

      confirmPopup.then(function(res) {
        if (res) {
          $window.sessionStorage.removeItem('logged');
          $window.sessionStorage.removeItem('username');
          $window.sessionStorage.removeItem('fullname');
          $window.sessionStorage.removeItem('user_mode');
          $window.sessionStorage.removeItem('off_id');
          $state.go('intro');
        }
      });
    }
  })
