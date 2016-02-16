angular.module('app.controllers.srrt.Upload', [])
.controller('SRRTUploadCtrl', function ($scope, $rootScope, $stateParams, $state,
  $ionicLoading, $cordovaCamera, $window, ReportService, SRRTService) {

  $scope.id = $stateParams.id;
  $scope.off_id = $window.sessionStorage.getItem('off_id');

  $ionicLoading.show({
    template: '<ion-spinner icon="android"></ion-spinner>'
  });

  ReportService.detail($rootScope.serverUrl, $rootScope.apiKey, $scope.id)
  .then(function (rows) {
    $scope.date_serv = moment(rows[0].date_serv).format('DD/MM/YYYY');
    $scope.report_date_0 = moment(rows[0].report_date_0).format('DD/MM/YYYY HH:mm:ss');
    $scope.report_date_1 = rows[0].report_date_1 ? moment(rows[0].report_date_1).format('DD/MM/YYYY HH:mm:ss') : 'ไม่พบข้อมูล';
    $scope.report_date_2 = rows[0].report_date_2 ? moment(rows[0].report_date_2).format('DD/MM/YYYY HH:mm:ss') : 'ไม่พบข้อมูล';
    $scope.report_date_3 = rows[0].report_date_3 ? moment(rows[0].report_date_3).format('DD/MM/YYYY HH:mm:ss') : 'ไม่พบข้อมูล';

    $scope.sex = rows[0].sex == '1' ? 'ชาย' : 'หญิง';
    $scope.off_name = rows[0].off_name;

    $scope.img_report_0_url = $rootScope.serverUrl + '/images/' + rows[0].img_report_0;
    $scope.img_report_1_url = $rootScope.serverUrl + '/images/' + rows[0].img_report_1;
    $scope.img_report_2_url = $rootScope.serverUrl + '/images/' + rows[0].img_report_2;
    $scope.img_report_3_url = $rootScope.serverUrl + '/images/' + rows[0].img_report_3;

    $ionicLoading.hide();
  },  function (err) {
    $ionicLoading.hide();
    alert(JSON.stringify(err))
    console.log(err);
  });

  $scope.takePicture = function(type) {

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
      // save data
      $scope.save(type, imageData);

    }, function(err) {
      // error
      alert(JSON.stringify(err))
    });
  };

  $scope.save = function (type, imageData) {
    SRRTService.saveImage($rootScope.serverUrl, $rootScope.apiKey, $scope.off_id,
      $scope.id, type, imageData)
    .then(function (data) {
      if (type == 1) {
        $scope.img_report_1_url = $rootScope.serverUrl + '/images/' + data.image;
        $scope.report_date_1 = data.date;
      } else if (type == 2) {
        $scope.img_report_2_url = $rootScope.serverUrl + '/images/' + data.image;
        $scope.report_date_2 = data.date;
      } else if (type == 3) {
        $scope.img_report_3_url = $rootScope.serverUrl + '/images/' + data.image;
        $scope.report_date_3 = data.date;
      }
    }, function (err) {
      alert(JSON.stringify(err))
      console.log(err);
    })
  };

});
