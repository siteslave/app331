angular.module('app.controllers.report.Search', [])
.controller('ReportSearchCtrl', function ($scope, $rootScope, ReportService) {
  // Get ampur
  ReportService.getAmp($rootScope.serverUrl, $rootScope.apiKey)
  .then(function (rows) {
    $scope.ampur = rows;
  });
  // get office
  $scope.getOffice = function () {
    ReportService.getOfficeFromAmp($rootScope.serverUrl, $rootScope.apiKey, $scope.amp)
    .then(function (rows) {
      $scope.offices = rows;
    })
  };

  $scope.search = function () {
    var date_serv = moment($scope.dateServ).format('YYYY-MM-DD');
    ReportService.search($rootScope.serverUrl, $rootScope.apiKey, $scope.office, date_serv)
    .then(function (rows) {
      $scope.services = rows;
    })
  }
})
