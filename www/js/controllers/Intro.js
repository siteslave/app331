angular.module('app.controllers.Intro', [])
.controller('IntroCtrl', function ($scope, $window, $state) {

  $scope.$on('$ionicView.enter', function(){
    if ($window.sessionStorage.getItem('logged')) {
        if ($window.sessionStorage.getItem('user_mode') == '2') {
          $state.go('srrt.main')
        } else {
          $state.go('report.main')
        }
    }
  });
});
