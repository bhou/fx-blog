angular.module("blogImageLibModule", ["ngUpload"])
  .controller("blogImageLibCtrl", ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.page = 0;
    $scope.limit = 3;
    $scope.images = [];

    $scope.getNextImages = function() {
      if ($scope.images.length < $scope.limit) {
        return;
      }

      $scope.getImages(Number($scope.page)+1, $scope.limit, function(status) {
        if (!status) {
          $scope.page = Number($scope.page)+1;
        }
      });
    };

    $scope.getPreviousImages = function() {
      if ($scope.page <= 0) {
        $scope.page = 0;
        return;
      }

      $scope.getImages(Number($scope.page)-1, $scope.limit, function(status) {
        if (!status) {
          $scope.page = Number($scope.page)-1;
        }
      });
    };

    $scope.getLatestImages = function() {
      $scope.getImages(0, $scope.limit, function(status) {
        if (!status) {
          $scope.page = 0;
        }
      });
    };

    $scope.getImages = function (page, limit, done) {
      var url = webRoot + '/api/files?page=' + page + '&limit=' + limit;
      $http.get(url)
        .success(function (data, status, headers, config) {
          if (status == 200) {
            $scope.images = data;

            for (var i = 0; i < $scope.images.length; i++ ) {
              var image = $scope.images[i];
            }

            if (done) {
              done();
            }
          }
        })
        .error(function (data, status, headers, config) {
          $window.alert('Failed to get images');
          if (done) {
            done(status);
          }
        });
    }

    $scope.uploadComplete = function (content) {
      $scope.getLatestImages();
      Materialize.toast('Upload DONE!', 4000);
    };

    $scope.copyToClipboard = function(text) {
      window.prompt("Copy to clipboard: Ctrl+C or Cmd+C, Enter", text);
    };

    $scope.deleteImage = function(id) {
      var url = webRoot + '/api/file?id=' + id;
      $http.delete(url)
        .success(function (data, status, headers, config) {
          if (status == 200) {
            $scope.getLatestImages();
            Materialize.toast('Delete Image DONE!', 4000);
          }
        })
        .error(function (data, status, headers, config) {
          Materialize.toast('Delete Image FAILED!', 4000);
        });
    };

    $scope.getLatestImages();
  }]);