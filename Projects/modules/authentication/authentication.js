var app = angular.module('app.authentication', [
    "app.authentication.controller",
    "app.authentication.service",
    "app.authentication.product",
    "app.authentication.category"
]);

app.config(function ($stateProvider) {
    $stateProvider.state('authentication', {
        views: {
            'root': {
                templateUrl: 'modules/authentication/views/authentication.html',
                controller: 'authenticationCtrl'
            }
        }
    });
});
