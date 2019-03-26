var app = angular.module('app.authentication.controller',[]);

app.controller('authenticationCtrl', function($scope,$state,$rootScope){
	$rootScope.$state = $state;
	console.log($state.includes('authentication.product'));
	console.log("get in authenticationCtrl");
});