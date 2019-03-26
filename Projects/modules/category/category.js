var app = angular.module('app.authentication.category', [
	'app.authentication.category.controller',
	'app.authentication.category.service'
]);

app.config(function ($stateProvider) {
	$stateProvider.state('authentication.category', {
		abstract: true,
		url: '/category',
		data: { pageTitle: 'Practice-Category' },
		templateUrl: 'modules/category/views/category.html',
		controller: 'categoryCtrl',
	}).state('authentication.category.list', {
		url: '/list',
		data: { pageTitle: 'Practice-Category' },
		templateUrl: 'modules/category/views/list.html',
		controller: 'cateListCtrl',
	});
});