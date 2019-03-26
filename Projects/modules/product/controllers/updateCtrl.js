var app = angular.module('app.authentication.product.update.controller', []);

app.controller('proUpdateCtrl', function ($scope, $rootScope, productService, toastr, $state, $stateParams) {
	console.log("get in product updateCtrl", $stateParams.idprod);
	$rootScope.btnHide = !$state.includes('authentication.product.list');
	var idProd = $stateParams.idprod;

	$scope.submitTime = 0;
	$scope.lsError = {};

	var resetData = function () {
		if (idProd) {
			productService.getProduct(idProd).then(function (response) {
				if (response.message === "success") {
					$scope.data = response.data[0];
					$scope.data.category = $scope.data.category.toString();
					if ($scope.data.image) {
						$('.custom-file-input').next('.form-control-file').addClass("selected").html($scope.data.image);
					};
				};
			}, function (err) {
				toastr.error('Error', 'Get Product Error!');
				console.log("Get Product Error", err);
			});
		} else {
			$scope.data = {
				id: "",
				product_name: "",
				category: "",
				price: "",
				image: "",
				description: "",
				status: false
			}
		};
	};

	$scope.getListCategories = function () {
		productService.getListCategories().then(function (response) {
			if (response.message === "success") {
				$scope.listCategories = response.data;
			};
		});
	};

	$scope.getListCategories();
	resetData();

	$scope.saveProduct = function (data) {
		console.log("data", data);
		$scope.submitTime++;
		$scope.lsError = {};
		productService.validate(data).then(function (result) {
			if (result.message === "success") {
				$scope.submitTime = 0;

				var { id, product_name, category, price, image, description, status } = $scope.data;
				var data = {
					id: id,
					product_name: product_name,
					category: parseInt(category, 10),
					price: price,
					image: image,
					description: description,
					status: status ? 1 : 0,
					create_time: new Date(),
					update_time: null
				};
				if (id) {
					data.update_time = new Date();
					productService.updateProduct(data).then(function (response) {
						if (response.message === "success") {
							toastr.success("Success", "Update Product Success!");
							$state.go("authentication.product.list");
						};
					}, function (err) {
						toastr.error('Error', 'Update Product Error!');
						console.log("Update Product Error!", err);
					});
				} else {
					productService.insertProduct(data).then(function (response) {
						if (response.message === "success") {
							toastr.success("Success", "Insert Product Success");
							$state.go("authentication.product.list");
						};
					}, function (err) {
						toastr.error("Error", "Insert Product Error!");
						console.log("Insert Product Error!");
					})
				}
			}
		}, function (err) {
			toastr.error('Please check data again!', 'Error');
			for (var i = 0; i < err.length; i++) {
				if ($scope.lsError[err[i].field] && $scope.lsError[err[i].field].length > 0) {
					$scope.lsError[err[i].field].push({
						msg: err[i].message
					})
				} else {
					$scope.lsError[err[i].field] = [];
					$scope.lsError[err[i].field].push({
						msg: err[i].message
					})
				}
			}
		});
	};

	$('.custom-file-input').on('change', function () {
		$scope.data.image = $(this).val();
		$(this).next('.form-control-file').addClass("selected").html($scope.data.image);
	})
});