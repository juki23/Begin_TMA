var app = angular.module('app.authentication.category.list.controller', []);

app.controller('cateListCtrl', function ($scope, toastr, categoryService) {
	console.log("get in category listCtrl");

	$scope.lsError = {};
	$scope.submitTime = 0;

	var resetData = function () {
		$scope.data = {
			id: "",
			category_name: "",
			description: "",
			status: false,
		};
	};

	$scope.getListCategory = function () {
		categoryService.getListCategory().then(function (response) {
			if (response.message === "success") {
				$scope.categories = response.data;
				resetData();
			};
		}, function (err) {
			console.log("Server Error", err);
		});
	};

	$scope.getListCategory();

	$scope.createCategory = function (data) {
		console.log("sadas", data);
		$scope.submitTime++;
		$scope.lsError = {};
		categoryService.validate(data).then(function (result) {
			if (result.message === "success") {
				var { id, category_name, description, status } = data;
				$scope.submitTime = 0;

				var category = {
					id: id,
					category_name: category_name,
					description: description,
					status: status ? 1 : 0,
					create_time: new Date(),
					update_time: null
				};
				if (id) {
					category.update_time = new Date();
					categoryService.updateCategory(category).then(function (response) {
						if (response.message === "success") {
							toastr.success('Success', 'Update Category Success !');
							$scope.getListCategory();
						};
					}, function (err) {
						toastr.error('Error', 'Update Category Error !');
						console.log("Update Category Error", err);
					});
				} else {
					categoryService.insertCategory(category).then(function (response) {
						if (response.message === "success") {
							toastr.success('Success', 'Insert Category Success !');
							$scope.getListCategory();
						};
					}, function (err) {
						toastr.error('Error', 'Insert Category Error !');
						console.log("Insert Category Error", err);
					});
				};
			}
		}, function (err) {
			toastr.error('Please check data again!', 'Error');
			for (var i = 0; i < err.length; i++) {
				if ($scope.lsError[err[i].field] && $scope.lsError[err[i].field].length > 0) {
					$scope.lsError[err[i].field].push({
						msg: err[i].message	
					})
				}else{
					$scope.lsError[err[i].field] = [];
					$scope.lsError[err[i].field].push({
						msg: err[i].message	
					})
				}
			}
			console.log($scope.lsError);
		});


	};

	$scope.selectCategory = function (data) {
		console.log("select", data);
		if (data) {
			$scope.data = angular.copy(data);
			$scope.data.status = $scope.data.status === 1 ? true : false;
		};
	};

	$scope.deleteCategory = function (data) {
		if (data.id) {
			categoryService.deleteCategory(data.id).then(function (response) {
				if (response.message === "success") {
					toastr.success('Success', 'Delete Category Success !');
					$scope.getListCategory();
				};
			}, function (err) {
				toastr.error('Error', 'Delete Category Error !');
				console.log("Delete Category Error", err);
			});
		};
	};

	$scope.reset = function () {
		resetData();
	};
});