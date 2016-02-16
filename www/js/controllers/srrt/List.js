angular.module('app.controllers.srrt.List', [])
.controller('SRRTListCtrl', function ($scope, $rootScope, $stateParams, $window,
  $ionicLoading, SRRTService) {

  $scope.date_serv = null;
  $scope.off_id = $window.sessionStorage.getItem('off_id');

  $scope.services = [];

  $scope.$on('$ionicView.enter', function(){
    $scope.filterred();
  });


  $scope.filterred = function () {
    $ionicLoading.show({
      template: '<ion-spinner icon="android"></ion-spinner>'
    });
    $scope.services = [];
    $scope.date_serv = moment($scope.dateServ).format('YYYY-MM-DD');

    SRRTService.getListByDate($rootScope.serverUrl, $rootScope.apiKey, $scope.off_id, $scope.date_serv)
    .then(function (rows) {
      var success = 0;

      rows.forEach(function (v) {
        var obj = {};
        obj.id = v.id;
        obj.date_serv = moment(v.date_serv).format('DD/MM/YYYY');
        obj.report_date = moment(v.report_date_0).format('DD/MM/YYYY HH:mm:ss');

        if (v.report_date_0 && v.report_date_1) {
          var start = moment(v.report_date_0);
          var end = moment(v.report_date_1);
          var duration = moment.duration(end.diff(start));
          var hours = duration.asHours();
          success += hours <= 3 ? 1 : 0;
        }

        if (v.report_date_1 && v.report_date_2) {
          var start = moment(v.report_date_1);
          var end = moment(v.report_date_2);
          var duration = moment.duration(end.diff(start));
          var hours = duration.asHours();
          success += hours <= 3 ? 1 : 0;
        }

        if (v.report_date_2 && v.report_date_3) {
          var start = moment(v.report_date_2);
          var end = moment(v.report_date_3);
          var duration = moment.duration(end.diff(start));
          var hours = duration.asHours();
          success += hours <= 24 ? 1 : 0;
        }

        obj.success = success;
        $scope.services.push(obj);
        console.log(success);
      });

      $ionicLoading.hide();

    }, function (err) {
      $ionicLoading.hide();
      console.log(err);
    })
  }

})
