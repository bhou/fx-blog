// category is injected by ejs

angular.module("blogListModule", [])
  .controller("blogListCtrl", ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.articles = [];
    $scope.page = 0;
    $scope.limit = 10;

    var categories = ['tutorial', 'document']; // add your category here

    $scope.getArticles = function () {
      if (category === '' ||
        categories.indexOf(category) < 0) {
        $scope.articles = [];
        return;
      }

      var url = webRoot + '/article/searchByTags?key=' + category +
        '&page=' + $scope.page + '&limit=' + $scope.limit;

      $http.get(url)
        .success(function (data, status, headers, config) {
          if (status == 200) {
            $scope.articles = data;
            Materialize.toast('Get Category DONE!', 4000);
          } else {
            Materialize.toast('Get Category FAILED!', 4000);
          }
        })
        .error(function (data, status, headers, config) {
          Materialize.toast('Get Category FAILED!', 4000);
        });
    }

    $scope.getArticles();
  }]);