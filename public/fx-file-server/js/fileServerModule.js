angular.module("fileServerModule", ["ngUpload"])
  .controller("fileServerCtrl", ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.keys = null;
    $scope.page = 0;
    $scope.limit = 28;
    $scope.files = [];

    $scope.currentFile = null;

    $scope.getNextFiles = function() {
      if ($scope.files.length < $scope.limit) {
        return;
      }

      $scope.getFiles(Number($scope.page)+1, $scope.limit, function(status) {
        if (!status) {
          $scope.page = Number($scope.page)+1;
        }
      });
    };

    $scope.getPreviousFiles = function() {
      if ($scope.page <= 0) {
        $scope.page = 0;
        return;
      }

      $scope.getFiles(Number($scope.page)-1, $scope.limit, function(status) {
        if (!status) {
          $scope.page = Number($scope.page)-1;
        }
      });
    };

    $scope.getLatestFiles = function() {
      $scope.getFiles(0, $scope.limit, function(status) {
        if (!status) {
          $scope.page = 0;
        }
      });
    };

    $scope.getFiles = function (page, limit, done) {
      var url = webRoot + '/api/file/search?page=' + page + '&limit=' + limit;

      if ($scope.keys) {
        $scope.keys = $scope.keys.toLowerCase();
        url += '&key=' + $scope.keys;
      }

      $http.get(url)
        .success(function (data, status, headers, config) {
          if (status == 200) {
            $scope.files = data;

            if (done) {
              done();
            }

            Materialize.toast('Get File List DONE!', 4000);
          }
        })
        .error(function (data, status, headers, config) {
          $window.alert('Failed to get images');
          Materialize.toast('Get File List FAILED!', 4000);
          if (done) {
            done(status);
          }
        });
    };

    $scope.uploadComplete = function (content) {
      if (!content.statusCode || content.statusCode == 200) {
        $scope.getLatestFiles();
        Materialize.toast('Upload DONE!', 4000);
      } else {
        Materialize.toast('Upload FAILED! CODE ' + content.statusCode, 4000);
      }
    };

    $scope.copyToClipboard = function(text) {
      window.prompt("Copy to clipboard: Ctrl+C or Cmd+C, Enter", text);
    };

    $scope.deleteFile = function(id) {
      var url = webRoot + '/api/file?id=' + id;
      $http.delete(url)
        .success(function (data, status, headers, config) {
          if (status == 200) {
            $scope.getLatestFiles();
            Materialize.toast('Delete File DONE!', 4000);
          }
        })
        .error(function (data, status, headers, config) {
          Materialize.toast('Delete File FAILED!', 4000);
        });
    };

    $scope.updateTags = function() {
      if (typeof $scope.currentFile.tags === 'object') {
        $scope.currentFile.tags = $scope.currentFile.tags.join(',');
      }
      var url = webRoot + '/api/file';
      $http.put(url, {
          id: $scope.currentFile._id,
          tags: $scope.currentFile.tags,
          description: $scope.currentFile.description
      }).success(function (data, status, headers, config) {
          if (status == 200) {
            if (typeof $scope.currentFile.tags === 'string') {
              $scope.currentFile.tags = $scope.currentFile.tags.split(',');
            }
            Materialize.toast('File Tags Update DONE!', 4000);
          } else {
            Materialize.toast('File Tags Update FAILED!', 4000);
          }
        })
        .error(function (data, status, headers, config) {
          Materialize.toast('File Tags Update FAILED!', 4000);
        });
    };

    $scope.getImagePath = function(path) {
      function endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
      };

      if (endsWith(path, 'jpg') || endsWith(path, 'png')) {
        return path;
      }

      return '/fx-file-server/images/default-file-600x300.png'
    };

    $scope.editTagDialog = function(file) {
      $scope.currentFile = file;
      $('#tagEditor').openModal();
    };

    $scope.enterKey = function (keyEvent) {
      if (keyEvent.which === 13){
        $scope.getLatestFiles();
      }
    };

    $scope.clearKey = function () {
      $scope.keys = null;
    };

    $scope.getLatestFiles();
  }]);