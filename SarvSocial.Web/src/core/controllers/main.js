﻿/**=========================================================
 * Module: main.js
 * Main Application Controller
 =========================================================*/

App.controller('AppController',
  ['$rootScope', '$scope', '$state', '$translate', '$window', '$localStorage', '$timeout', 'toggleStateService', 'colors', 'browser', 'cfpLoadingBar', 'authService', //'mails',
  function ($rootScope, $scope, $state, $translate, $window, $localStorage, $timeout, toggle, colors, browser, cfpLoadingBar,mails,authService) {
      "use strict";
   
      $scope.filterGroup = [{
          title: "Task Type",
          content: ["Task Type 1", "Task Type 2", "Task Type 3", "Task Type 4"],
          open: false,
          checked: false

      }, {
          title: "Connectors",
          content: ["c1", "c2"],
          open: false,
          checked: false
      }, {
          title: "Schedules",
          content: ["s1", "s2"],
          open: false,
          checked: false
      }, {
          title: "Secure Agents",
          content: ["a1", "zmr"],
          open: false,
          checked: false
      }];


      //karab for checked emails
      //$scope.checkedmails = {
      //    ids: []
      //};

      // Loading bar transition
      // ----------------------------------- 
     
      var thBar;
      $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
          if ($('.wrapper > section').length) // check if bar container exists
              thBar = $timeout(function () {
                  cfpLoadingBar.start();
              }, 0); // sets a latency Threshold
      });
      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
          event.targetScope.$watch("$viewContentLoaded", function () {
              $timeout.cancel(thBar);
              cfpLoadingBar.complete();
          });
      });

      // Hook not found
      $rootScope.$on('$stateNotFound',
        function (event, unfoundState, fromState, fromParams) {
            console.log(unfoundState.to); // "lazy.state"
            console.log(unfoundState.toParams); // {a:1, b:2}
            console.log(unfoundState.options); // {inherit:false} + default options
        });
      // Hook error
      $rootScope.$on('$stateChangeError',
        function (event, toState, toParams, fromState, fromParams, error) {
            console.log(error);
        });
      // Hook success
      $rootScope.$on('$stateChangeSuccess',
        function (event, toState, toParams, fromState, fromParams) {
            // display new view from top
            $window.scrollTo(0, 0);
            // Save the route title
            $rootScope.currTitle = $state.current.title;
        });

      $rootScope.currTitle = $state.current.title;
      $rootScope.pageTitle = function () {
          return $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
      };

      // iPad may presents ghost click issues
      // if( ! browser.ipad )
      // FastClick.attach(document.body);

      // Close submenu when sidebar change from collapsed to normal
      $rootScope.$watch('app.layout.isCollapsed', function (newValue, oldValue) {
          if (newValue === false)
              $rootScope.$broadcast('closeSidebarMenu');
      });

      // Restore layout settings
      if (angular.isDefined($localStorage.layout))
          $scope.app.layout = $localStorage.layout;
      else
          $localStorage.layout = $scope.app.layout;

      $rootScope.$watch("app.layout", function () {
          $localStorage.layout = $scope.app.layout;
      }, true);


      // Allows to use branding color with interpolation
      // {{ colorByName('primary') }}
      $scope.colorByName = colors.byName;

      // Hides/show user avatar on sidebar
      $scope.toggleUserBlock = function () {
          $scope.$broadcast('toggleUserBlock');
      };

      $scope.logout = function () {
          console.log('main : logout called')
          //authService.logOut();
          //$state.go('page.login');
          $scope.$broadcast('logOut');
      };

      // Internationalization
      // ----------------------

      $scope.language = {
          // Handles language dropdown
          listIsOpen: false,
          // list of available languages
          available: {
              'en': 'English',
              'fa': 'فارسی'
          },
          // display always the current ui language
          init: function () {
              var proposedLanguage = $translate.proposedLanguage() || $translate.use();
              var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
              $scope.language.selected = $scope.language.available[(proposedLanguage || preferredLanguage)];
          },
          set: function (localeId, ev) {
              // Set the new idiom
              $translate.use(localeId);
              // save a reference for the current language
              $scope.language.selected = $scope.language.available[localeId];
              // finally toggle dropdown
              $scope.language.listIsOpen = !$scope.language.listIsOpen;
          }
      };

      $scope.language.init();

      // Restore application classes state
      toggle.restoreState($(document.body));

      // Applies animation to main view for the next pages to load
      $timeout(function () {
          $rootScope.mainViewAnimation = $rootScope.app.viewAnimation;
      });

      // cancel click event easily
      $rootScope.cancel = function ($event) {
          $event.stopPropagation();
      };

  }]);
