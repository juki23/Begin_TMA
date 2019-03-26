angular.module('app.authentication.service', []).factory("AuthenticationService", function (Restangular) {
    var services = {};
    var api = Restangular.all("api");

    return services;
})
