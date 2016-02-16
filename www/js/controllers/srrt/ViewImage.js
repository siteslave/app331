angular.module('app.controllers.srrt.ViewImage', [])
.controller('SRRTViewImageCtrl', function ($scope, $rootScope, $stateParams) {

  $scope.imageSrc = $rootScope.serverUrl + '/images/' + $stateParams.image;
  console.log($scope.imageSrc);

})
