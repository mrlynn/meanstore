angular.module('meanstore.services', []).factory('Products', function($resource) {
  return $resource('http://localhost:3000/api/product/:id', { id: '@_id' }, {
    update: {
      method: 'PUT'
    }
  });
});