'use strict';

var App = angular.module('sarvsocial', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.bootstrap' ,'ui.router']);

App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider','$httpProvider',
      function ($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {

      $urlRouterProvider.otherwise('/app/social/stream');
      $stateProvider

          .state('app', {
              abstract: false,
              url: "/app",
              templateUrl: "dist/views/layout/layout.html",
          })
          .state('app.main', {
              url: "/main",
              templateUrl:  "dist/views/modules/main/main.html",
              data: { pageTitle: 'Example view' }
          })
          

     
  }])
.run(["$rootScope", function ($rootScope) {
    $rootScope.app = {
        name: 'sarvApp',
        description: 'Sarv Dashboard',
        year: ((new Date()).getFullYear()),
        layout: {
            isFixed: true,
            isCollapsed: false,
            isBoxed: false,
            isRTL: false,
            horizontal: false,
            isFloat: false,
            asideHover: false
        },
        useFullLayout: false,
        hiddenFooter: false,
        viewAnimation: 'ng-fadeInUp'

    };
}]);

App
  .constant('APP_COLORS', {
      'primary': '#5d9cec',
      'success': '#27c24c',
      'info': '#23b7e5',
      'warning': '#ff902b',
      'danger': '#f05050',
      'inverse': '#131e26',
      'green': '#37bc9b',
      'pink': '#f532e5',
      'purple': '#7266ba',
      'dark': '#3a3f51',
      'yellow': '#fad732',
      'gray-darker': '#232735',
      'gray-dark': '#3a3f51',
      'gray': '#dde6e9',
      'gray-light': '#e4eaec',
      'gray-lighter': '#edf1f2'
  })
  .constant('APP_MEDIAQUERY', {
      'desktopLG': 1200,
      'desktop': 992,
      'tablet': 768,
      'mobile': 480
  })

  .constant('APP_REQUIRES', {
  });


