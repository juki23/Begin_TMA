angular.module('app.authentication.category.service', []).factory("categoryService", function (Restangular, $q) {
    var services = {};
    var api = Restangular.all("api");

    services.getListCategory = function () {
        return api.one('/category/getAllCategories').get();
    };

    services.getCategory = function (id) {
        return api.one('/category/getCategory/' + id).get();
    };

    services.deleteCategory = function (id) {
        return api.one('/category/deleteCategory/', id).remove();
    };

    services.insertCategory = function (data) {
        var insertCategory = api.all("/category/insertCategory");
        return insertCategory.post({ data: data });
    };

    services.updateCategory = function (data) {
        var updateCategory = api.all("/category/updateCategory");
        return updateCategory.customPUT({ data: data });
    };

    services.validate = function (data) {
        var characterRegex = /^[a-zA-Z0-9\s]+$/;
        // var addressRegex = /^[a-zA-Z0-9\s,'-\/]{0,255}$/;
        var error = [];
        var q = $q.defer();
        if (data) {
            try {
                //validate category_name
                if (data.category_name) {
                    if (data.category_name.length < 0 || data.category_name.length > 200) {
                        error.push({ field: "category_name", message: "max length" });
                    }
                    if (!characterRegex.test(data.category_name)) {
                        error.push({ field: "category_name", message: "invalid value" });
                    }
                }
                else {
                    error.push({ field: "category_name", message: "required" });
                }

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
})
