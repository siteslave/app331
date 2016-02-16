angular.module('app.services.Srrt', [])
.factory('SRRTService', function ($q, $http) {
  return {
    getList: function (url, key, off_id) {
      var q = $q.defer();
      var _url = url + '/srrt/list';
      $http.post(_url, {off_id: off_id, key: key})
      .success(function (data) {
        q.resolve(data.rows)
      })
      .error(function (err) {
        q.reject(err)
      });

      return q.promise;
    },
    getListByDate: function (url, key, off_id, date_serv) {
      var q = $q.defer();
      var _url = url + '/srrt/list-by-date';
      $http.post(_url, {off_id: off_id, key: key, date_serv: date_serv})
      .success(function (data) {
        q.resolve(data.rows)
      })
      .error(function (err) {
        q.reject(err)
      });

      return q.promise;
    },
    saveImage: function (url, key, off_id, id, type, imageData) {
      var q = $q.defer();
      var _url = url + '/srrt/save-image';

      $http.post(_url, {
        key: key,
        off_id: off_id,
        id: id,
        type: type,
        imageData: imageData})
      .success(function (data) {
        q.resolve(data)
      })
      .error(function (err) {
        q.reject(err)
      });

      return q.promise;
    }
  }
})
