var app = angular.module('meanMartAdmin', ['ngRoute']);
app.factory("services", ['$http', function($http) {
  var serviceBase = 'api/'
    var obj = {};
    obj.getProducts = function(){
        return $http.get(serviceBase + 'products');
    }
    obj.getProduct = function(productID){
        return $http.get(serviceBase + 'product?id=' + productID);
    }

    obj.insertProduct = function (product) {
    return $http.post(serviceBase + 'insertProduct', product).then(function (results) {
        return results;
    });
  };

  obj.updateProduct = function (id,product) {
      return $http.post(serviceBase + 'updateProduct', {id:id, product:product}).then(function (status) {
          return status.data;
      });
  };

  obj.deleteProduct = function (id) {
      return $http.delete(serviceBase + 'deleteProduct?id=' + id).then(function (status) {
          return status.data;
      });
  };

    return obj;
}]);

app.controller('listCtrl', function ($scope, services) {
    services.getProducts().then(function(data){
        $scope.products = data.data;
    });
});

app.controller('editCtrl', function ($scope, $rootScope, $location, $routeParams, services, product) {
    var productID = ($routeParams.productID) ? parseInt($routeParams.productID) : 0;
    $rootScope.title = (productID > 0) ? 'Edit Product' : 'Add Product';
    $scope.buttonText = (productID > 0) ? 'Update Product' : 'Add New Product';
      var original = product.data;
      original._id = productID;
      $scope.product = angular.copy(original);
      $scope.product._id = productID;

      $scope.isClean = function() {
        return angular.equals(original, $scope.product);
      }

      $scope.deleteProduct = function(product) {
        $location.path('/');
        if(confirm("Are you sure to delete product number: "+$scope.product._id)==true)
        services.deleteProduct(product.productNumber);
      };

      $scope.saveProduct = function(product) {
        $location.path('/');
        if (productID <= 0) {
            services.insertProduct(product);
        }
        else {
            services.updateProduct(productID, product);
        }
    };
});

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        title: 'Products',
        templateUrl: 'partials/products.html',
        controller: 'listCtrl'
      })
      .when('/edit-product/:productID', {
        title: 'Edit Products',
        templateUrl: 'partials/edit-product.html',
        controller: 'editCtrl',
        resolve: {
          product: function(services, $route){
            var productID = $route.current.params.productID;
            return services.getProduct(productID);
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
}]);
app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);