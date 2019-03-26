var app = angular.module('app.authentication.category.controller',[
	'app.authentication.category.list.controller'
]);

app.controller('categoryCtrl', function($scope, categoryService){
	console.log("get in categoryCtrl");
});