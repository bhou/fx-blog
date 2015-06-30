angular.module("serviceListModule", [])
  .controller("serviceListCtrl", ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.services = [];
    $scope.keys = null;
    $scope.page = 0;
    $scope.limit = 12;

    $scope.getServices = function () {
      var key = '';
      if ($scope.keys) {
        key = $scope.keys;
      }

      var url = '/article/search?tags=service&key=' + key +
        '&page=' + $scope.page + '&limit=' + $scope.limit;

      $http.get(url)
        .success(function (data, status, headers, config) {
          if (status == 200) {
            $scope.services = data;
            Materialize.toast('Get Service List DONE!', 4000);
          } else {
            Materialize.toast('Get Service List FAILED!', 4000);
          }
        })
        .error(function (data, status, headers, config) {
          Materialize.toast('Get Service List FAILED!', 4000);
        });
    };

    $scope.enterKey = function (keyEvent) {
      if (keyEvent.which === 13){
        $scope.getServices();
      }
    };

    $scope.clearKey = function () {
      $scope.keys = null;
    };

    $scope.next = function() {
      $scope.page = Number($scope.page) + 1;
      $scope.getServices();
    };

    $scope.previous = function() {
      $scope.page = Number($scope.page) - 1;
      $scope.getServices();
    };

    $scope.getServices();
}]);
