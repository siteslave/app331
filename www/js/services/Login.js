angular.module('app.services.Login', [])
.factory('LoginService', function ($q, $http) {

  return {
    login: function (url, username, password, api_key) {
      var q = $q.defer();
      var data = {
        username: username,
        password: password,
        key: api_key
      };

      var _url = url + '/login';
      var options = {
        url: _url,
        data: data,
        timeout: 5000,
        method: 'POST'
      };

      $http(options)
      .success(function (data) {
        if (data.ok) {
          q.resolve(data.user);
        } else {
          q.reject(data.msg)
        }
      })
      .error(function () {
        q.reject('กรุณาตรวจสอบการเชื่อมต่อ!')
      });

      return q.promise;
    },
    logout: function () {

    },
    sendRegisterId: function (url, key, username, register_id, model, platform) {
      var q = $q.defer();
      var _url = url + '/register_gcm'
      $http.post(_url, {register_id: register_id, key: key, username: username, model: model, platform: platform})
      .success(function (data) {
        q.resolve(data)
      })
      .error(function () {
        q.reject('Connection failed.')
      });

      return q.promise;
    }
  }
})
