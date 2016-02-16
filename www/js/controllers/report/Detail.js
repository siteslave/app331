angular.module('app.controllers.report.Detail', [])
.controller('ReportDetailCtrl', function ($scope, $state, $rootScope,
  $stateParams, $ionicPopup, $ionicModal, ReportService) {
  var id = $stateParams.id;
  ReportService.detail($rootScope.serverUrl, $rootScope.apiKey, id)
  .then(function (rows) {
    $scope.date_serv = moment(rows[0].date_serv).format('DD/MM/YYYY');
    $scope.date_report = moment(rows[0].report_date_0).format('DD/MM/YYYY HH:mm:ss');
    $scope.sex = rows[0].sex == '1' ? 'ชาย' : 'หญิง';
    $scope.off_name = rows[0].off_name;

    $scope.imageSrc = $rootScope.serverUrl + '/images/' + rows[0].img_report_0;
  });

  $scope.remove = function () {
    var confirmPopup = $ionicPopup.confirm({
     title: 'Are you sure?',
     template: 'คุณต้องการลบรายการนี้ ใช่หรือไม่?'
   });

   confirmPopup.then(function(res) {
     if(res) {
       ReportService.remove($stateParams.id)
       .then(function () {
         $state.go('report.search')
       })
     }
   });
 };


 $ionicModal.fromTemplateUrl('image-modal.html', {
     scope: $scope,
     animation: 'slide-in-up'
   }).then(function(modal) {
     $scope.modal = modal;
   });

   $scope.viewImage = function() {
     $scope.modal.show();
   };

   $scope.closeModal = function() {
     $scope.modal.hide();
   };

   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
     $scope.modal.remove();
   });
})
