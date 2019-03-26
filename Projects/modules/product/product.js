var app = angular.module('app.authentication.product', [
	'app.authentication.product.controller',
	'app.authentication.product.service'
]);

app.config(function ($stateProvider) {
	$stateProvider.state('authentication.product', {
		abstract: true,
		url: '/product',
		data: { pageTitle: 'Practice-Product' },
		templateUrl: 'modules/product/views/index.html',
		controller: 'productCtrl',
	}).state('authentication.product.list', {
		url: '/list',
		data: { pageTitle: 'Practice-Product' },
		templateUrl: 'modules/product/views/list.html',
		controller: 'proListCtrl',
	}).state('authentication.product.update', {
		url: '/update/:idprod',
		data: { pageTitle: 'Practice-Product Update' },
		templateUrl: 'modules/product/views/update.html',
		controller: 'proUpdateCtrl',
	});
});