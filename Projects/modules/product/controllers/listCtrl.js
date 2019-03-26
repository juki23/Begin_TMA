var app = angular.module('app.authentication.product.list.controller', []);

app.controller('proListCtrl', function ($scope, $rootScope, productService, toastr, $state) {
	$rootScope.btnHide = !$state.includes('authentication.product.list');

	$scope.totalItems = 0;
	$scope.currentPage = 1;
	$scope.pageSize = 3;

	$scope.getListProducts = function () {
		var data = {
			pageSize: $scope.pageSize,
			currentPage: $scope.currentPage
		};
		productService.getListProducts(data).then(function (response) {
			if (response.message === "success") {
				$scope.lsProd = response.data;
				console.log("dsad",$scope.lsProd[0].amount)
				$scope.totalItems = $scope.lsProd[0].amount;
			};
		});
	};

	$scope.getListProducts();

	$scope.selectProduct = function (id) {
		$state.go("authentication.product.update", { idprod: id });
	};

	$scope.deleteProduct = function (id) {
		if (id) {
			productService.deleteProduct(id).then(function (response) {
				if (response.message === "success") {
					toastr.success("Success", "Delete Product Success!");
					$scope.getListProducts();
				};
			}, function (err) {
				toastr.error("Error", "Delete Product Error!");
				console.log("Delete Product Error!", err);
			});
		};
	};

	$scope.pageChanged = function() {
		console.log('Page changed to: ' + $scope.currentPage);
		$scope.getListProducts();
	};
});