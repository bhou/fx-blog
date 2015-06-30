angular.module("waveletListModule", [])
  .controller("waveletListCtrl", ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.services = [];
    $scope.keys = null;
    $scope.page = 0;
    $scope.limit = 12;

    $scope.getServices = function () {
      var key = '';
      if ($scope.keys) {
        key = $scope.keys;
      }

      var url = '/article/search?tags=wavelet&key=' + key +
        '&page=' + $scope.page + '&limit=' + $scope.limit;

      $http.get(url)
        .success(function (data, status, headers, config) {
          if (status == 200) {
            $scope.services = data;
            Materialize.toast('Get Wavelet List DONE!', 4000);
          } else {
            Materialize.toast('Get Wavelet List FAILED!', 4000);
          }
        })
        .error(function (data, status, headers, config) {
          Materialize.toast('Get Wavelet List FAILED!', 4000);
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

    $scope.getServices();
}]);
