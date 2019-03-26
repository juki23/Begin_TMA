angular.module('app.authentication.product.service', [])
    .factory("productService", function (Restangular, $q) {

        var services = {};
        var api = Restangular.all('api');

        services.getListCategories = function () {
            return api.one('/category/getAllCategories').get();
        };

        services.getListProducts = function (data) {
            return api.all('/product/getAllProducts').post({ data: data });
        };

        services.getProduct = function (id) {
            return api.one('/product/getProduct/' + id).get();
        };

        services.deleteProduct = function (id) {
            return api.one('/product/deleteProduct/', id).remove();
        };

        services.insertProduct = function (data) {
            var insertProduct = api.all("/product/insertProduct");
            return insertProduct.post({ data: data });
        };

        services.updateProduct = function (data) {
            var updateProduct = api.all("/product/updateProduct");
            return updateProduct.customPUT({ data: data });
        };

        services.validate = function (data) {
            var characterRegex = /^[a-zA-Z0-9\s]+$/;
            var priceRegex = /^[0-9]+(\.[0-9]{1,3})?$/;
            var error = [];
            var q = $q.defer();
            if (data) {
                try {
                    //validate category_name
                    if (data.product_name) {
                        if (data.product_name.length < 0 || data.product_name.length > 200) {
                            error.push({ field: "product_name", message: "max length" });
                        }
                        if (!characterRegex.test(data.product_name)) {
                            error.push({ field: "product_name", message: "invalid value" });
                        }
                    }
                    else {
                        error.push({ field: "product_name", message: "required" });
                    }

                    //validate category
                    if (!data.category) {
                        error.push({ field: "category", message: "required" });
                    };

                    //validate price
                    if (data.price) {
                        if (data.price.length < 0 || data.price.length > 200) {
                            error.push({ field: "price", message: "max length" });
                        }
                        if (!priceRegex.test(data.price)) {
                            error.push({ field: "price", message: "invalid value" });
                        }
                    }
                    else {
                        error.push({ field: "price", message: "required" });
                    }

                    //validate image
                    if (data.image.length > 300) {
                        error.push({ field: "image", message: "max length" });
                    };

                    //validate description
                    if (data.description.length > 500) {
                        error.push({ field: "description", message: "max length" });
                    };

                    if (error.length > 0) {
                        throw error;
                    }
                    else {
                        q.resolve({ message: 'success' });
                    }
                }
                catch (error) {
                    q.reject(error);
                }
            };
            return q.promise;
        };

        return services;
    });
