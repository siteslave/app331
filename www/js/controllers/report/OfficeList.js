angular.module('app.controllers.report.ReportOfficeList', [])
.controller('ReportOfficeListCtrl', function ($scope, $stateParams, $rootScope, ReportService) {
  var amp = $stateParams.amp;
  ReportService.getOfficeList($rootScope.serverUrl, $rootScope.apiKey, amp)
  .then(function (rows) {
    $scope.servicesOffice = rows;
  }, function (err) {
    console.log(err);
  })
})
