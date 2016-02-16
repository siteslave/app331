angular.module('app.controllers.report.Main', [])
  .controller('ReportMainCtrl', function($scope, $rootScope, $window, $state,
    $ionicLoading, ReportService) {

    if (!$window.sessionStorage.getItem('logged')) {
      $state.go('intro')
    }

    $scope.services = [];

    $scope.$on('$ionicView.enter', function() {
      $scope.getList();
    });

    $scope.getList = function() {
      $scope.services = [];

      $ionicLoading.show({
        template: '<ion-spinner icon="android"></ion-spinner>'
      });
      ReportService.getList($rootScope.serverUrl, $rootScope.apiKey)
        .then(function(rows) {
          $scope.services = rows;
          $ionicLoading.hide();
        }, function(err) {
          $ionicLoading.hide();
          console.log(err);
          alert(JSON.stringify(err))
        })
    };

    $scope.logout = function () {
      $window.sessionStorage.removeItem('logged');
      $window.sessionStorage.removeItem('username');
      $window.sessionStorage.removeItem('fullname');
      $window.sessionStorage.removeItem('user_mode');
      $window.sessionStorage.removeItem('off_id');
      $state.go('login');
    }

  })
