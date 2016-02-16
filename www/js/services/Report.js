angular.module('app.services.Reporter', [])
.factory('ReportService', function ($q, $http) {

  return {
    saveReport: function (url, key, service) {
      var q = $q.defer();

      var data = {
        service: service,
        key: key
      };

      var _url = url + '/save-report';

      $http.post(_url, data)
      .success(function (data) {
        if (data.ok) {
          q.resolve()
        } else {
          q.reject(data.msg)
        }
      })
      .error(function () {
        q.reject('Connection failed')
      });

      return q.promise;
    },

    remove: function (url, key, id) {
      var q = $q.defer();
      var data = {
        id: id,
        key: key
      };
      var _url = url + '/patient/remove';

      $http.post(_url, data)
      .success(function (data) {
        if (data.ok) {
          q.resolve()
        } else {
          q.reject(data.msg)
        }
      })
      .error(function () {
        q.reject('Connection failed')
      });

      return q.promise;
    },

    search: function (url, key, office, date_serv) {
      var q = $q.defer();
      var _url = url + '/search'
      $http.post(_url, {key: key, office: office, date_serv: date_serv})
      .success(function (data) {
        if (data.ok) {
          q.resolve(data.rows)
        } else {
          q.reject(data.msg)
        }
      })
      .error(function () {
        q.reject('Connection failed')
      });

      return q.promise;
    },

    detail: function (url, key, id) {
      var q = $q.defer();
      var _url = url + '/detail'
      $http.post(_url, {key: key, id: id})
      .success(function (data) {
        if (data.ok) {
          q.resolve(data.rows)
        } else {
          q.reject(data.msg)
        }
      })
      .error(function () {
        q.reject('Connection failed')
      });

      return q.promise;
    },

    getList: function (url, key) {
      var q = $q.defer();
      var _url = url + '/list'
      $http.post(_url, {key: key})
      .success(function (data) {
        if (data.ok) {
          q.resolve(data.rows)
        } else {
          q.reject(data.msg)
        }
      })
      .error(function () {
        q.reject('Connection failed')
      });

      return q.promise;
    },

    getOfficeList: function (url, key, amp) {
      var q = $q.defer();
      var _url = url + '/office-list'
      $http.post(_url, {key: key, amp: amp})
      .success(function (data) {
        if (data.ok) {
          q.resolve(data.rows)
        } else {
          q.reject(data.msg)
        }
      })
      .error(function () {
        q.reject('Connection failed')
      });

      return q.promise;
    },

    getOfficeFromAmp: function (url, key, amp) {
      var q = $q.defer();
      var _url = url + '/basic/office-amp'
      $http.post(_url, {key: key, amp: amp})
      .success(function (data) {
        if (data.ok) {
          q.resolve(data.rows)
        } else {
          q.reject(data.msg)
        }
      })
      .error(function () {
        q.reject('Connection failed')
      });

      return q.promise;
    },

    getAmp: function (url, key) {
      var q = $q.defer();
      var _url = url + '/basic/amp'
      $http.post(_url, {key: key})
      .success(function (data) {
        if (data.ok) {
          q.resolve(data.rows)
        } else {
          q.reject(data.msg)
        }
      })
      .error(function () {
        q.reject('Connection failed')
      });

      return q.promise;
    },

    getTambol: function (url, key, amp) {
      var q = $q.defer();
      var _url = url + '/basic/tambol'
      $http.post(_url, {key: key, amp: amp})
      .success(function (data) {
        if (data.ok) {
          q.resolve(data.rows)
        } else {
          q.reject(data.msg)
        }
      })
      .error(function () {
        q.reject('Connection failed')
      });

      return q.promise;
    },

    getOffice: function (url, key, tambol) {
      var q = $q.defer();
      var _url = url + '/basic/office'
      $http.post(_url, {key: key, tambol: tambol})
      .success(function (data) {
        if (data.ok) {
          q.resolve(data.rows)
        } else {
          q.reject(data.msg)
        }
      })
      .error(function () {
        q.reject('Connection failed')
      });

      return q.promise;
    }
  }

});
