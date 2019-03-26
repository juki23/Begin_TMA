var app = angular.module('app.authentication.product.controller',[
	'app.authentication.product.list.controller',
	'app.authentication.product.update.controller'
]);

app.controller('productCtrl', function($scope, productService,$state,$rootScope){
	console.log("get in productCtrl");
});