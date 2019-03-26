"use strict";

var app = angular.module('app', [
    "ngAnimate",
    "toastr",
    "ui.router",
    "restangular",
    "ui.bootstrap",
    "app.authentication"
]);

app.config(function ($stateProvider, $urlRouterProvider, RestangularProvider, $httpProvider) {

    // JWT SIGN
    $httpProvider.interceptors.push(function ($q) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                config.headers.systemtype = "WEB";
                return config;
            },
            'responseError': function (response) {
                return $q.reject(response);
            },

            'response': function (response) {
                return response;
            },
        };
    });
    // END JWT SIGN

    // CORS PROXY
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    // END CORS PROXY

    //Mục đích: request có thể send cookies để authentication với passport
    RestangularProvider.setBaseUrl('http://localhost:3000');
    RestangularProvider.setDefaultHttpFields({
        'withCredentials': true
    });
    // 'http://192.168.1.247:3005'
    $urlRouterProvider.otherwise('');

    $stateProvider.state('sys', {
        url: '',
        resolve: {
            initHome: function ($state, $timeout) {
                $timeout(function () {
                    $state.go("authentication.product.list");
                }, 100);
            }
        }
    });
})