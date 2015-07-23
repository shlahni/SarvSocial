App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider',
      function ($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {
          'use strict';

          $stateProvider
      .state('app.social', {
          url: '/social',
          title: 'social',
          abstract: false,
          templateUrl: "dist/views/social/views/social.html"
      })
           .state('app.social.stream', {
               url: "/stream",
               templateUrl: "dist/views/social/views/stream.html",
               data: { pageTitle: 'Stream page' },
               controller: 'streamController'
           })
          .state('app.social.friends', {
              url: "/friends",
              templateUrl: "dist/views/social/views/friends.html",
              data: { pageTitle: 'Friends List' },
              controller: 'friendController'
          })
      }
]);