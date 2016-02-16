angular.module('app', [
  'ionic', 'ngCordova',
  'app.controllers.Login',
  'app.controllers.report.Main', 'app.controllers.Intro',
  'app.controllers.report.New', 'app.controllers.report.ReportOfficeList',
  'app.controllers.report.Search', 'app.controllers.report.Detail',
  'app.controllers.srrt.Main', 'app.controllers.srrt.Preview','app.controllers.srrt.ViewImage',
  'app.controllers.srrt.Upload', 'app.controllers.srrt.List'
])

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {

    $rootScope.badgeNew = 0;

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    // if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
    //   cordova.plugins.Kbeyboard.hideKeyboardAccessoryBar(true);
    //   cordova.plugins.Keyboard.disableScroll(true);
    // }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    // server settting
    $rootScope.serverUrl = 'http://192.168.10.203:3000';
    $rootScope.apiKey = '123456';

  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login/login.html',
      controller: 'LoginCtrl'
    })
    .state('intro', {
      url: '/intro',
      templateUrl: 'templates/intro.html',
      controller: 'IntroCtrl'
    })

    .state('help', {
      url: '/help',
      templateUrl: 'templates/help.html'
    })

    .state('srrt', {
      url: '/srrt',
      abstract: true,
      templateUrl: 'templates/srrt/tabs.html'
    })
    .state('srrt.main', {
      url: '/main',
      views: {
        'tab-main': {
          templateUrl: 'templates/srrt/tab-main.html',
          controller: 'SRRTMainCtrl'
        }
      }
    })
    .state('srrt.list', {
      url: '/srrt-list',
      views: {
        'tab-list': {
          templateUrl: 'templates/srrt/tab-list.html',
          controller: 'SRRTListCtrl'
        }
      }
    })
    .state('srrt.profile', {
      url: '/srrt-profile',
      views: {
        'tab-profile': {
          templateUrl: 'templates/srrt/tab-profile.html'
        }
      }
    })
    .state('srrt.preview', {
      url: '/srrt-preview/:id',
      views: {
        'tab-main': {
          templateUrl: 'templates/srrt/tab-preview.html',
          controller: 'SRRTPreviewCtrl'
        }
      }
    })
    .state('srrt.viewimage', {
      url: '/srrt-view-image/:image',
      views: {
        'tab-main': {
          templateUrl: 'templates/srrt/tab-view-image.html',
          controller: 'SRRTViewImageCtrl'
        }
      }
    })
    .state('srrt.upload', {
      url: '/srrt-upload/:id',
      views: {
        'tab-list': {
          templateUrl: 'templates/srrt/tab-upload.html',
          controller: 'SRRTUploadCtrl'
        }
      }
    })
    .state('report', {
      url: '/report',
      abstract: true,
      templateUrl: 'templates/report/tabs.html'
    })
    .state('report.main', {
      url: '/main',
      views: {
        'tab-main': {
          templateUrl: 'templates/report/tab-main.html',
          controller: 'ReportMainCtrl'
        }
      }
    })
    .state('report.new', {
      url: '/new',
      views: {
        'tab-new': {
          templateUrl: 'templates/report/tab-new.html',
          controller: 'ReportNewCtrl'
        }
      }
    })
    .state('report.officeList', {
      url: '/office-list/:amp',
      views: {
        'tab-main': {
          templateUrl: 'templates/report/tab-office-list.html',
          controller: 'ReportOfficeListCtrl'
        }
      }
    })
    .state('report.search', {
      url: '/search',
      views: {
        'tab-search': {
          templateUrl: 'templates/report/tab-search.html',
          controller: 'ReportSearchCtrl'
        }
      }
    })
    .state('report.edit', {
      url: '/edit/:id',
      views: {
        'tab-search': {
          templateUrl: 'templates/report/tab-edit.html',
          controller: 'ReportDetailCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/intro');

});
