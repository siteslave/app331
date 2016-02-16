angular.module('app.controllers.srrt.Preview', [])
.controller('SRRTPreviewCtrl', function ($scope, $rootScope, $state, $stateParams, ReportService) {

  $scope.id = $stateParams.id;
  ReportService.detail($rootScope.serverUrl, $rootScope.apiKey, $scope.id)
  .then(function (rows) {
    $scope.date_serv = moment(rows[0].date_serv).format('DD/MM/YYYY');
    $scope.date_report = moment(rows[0].report_date_0).format('DD/MM/YYYY HH:mm:ss');
    $scope.sex = rows[0].sex == '1' ? 'ชาย' : 'หญิง';
    $scope.off_name = rows[0].off_name;

    $scope.imageSrc = $rootScope.serverUrl + '/images/' + rows[0].img_report_0;
    $scope.image = rows[0].img_report_0;
  });

  $scope.upload = function () {
    $state.go('srrt.upload', {id: $scope.id});
  }

})
