angular.module("fileInfoModule", [])
  .controller("fileInfoCtrl", ['$scope', '$http', '$window', '$sce', function ($scope, $http, $window, $sce) {
    $scope.file = null;
    $scope.description = null;

    var renderer = new marked.Renderer();

    renderer.link = function( href,  title,  text) {
      var ret = null;
      if (title && title.indexOf('btn') >= 0) {
        ret = '<a class="btn" href="' + href + '">' + text + '</a>';
      } else {
        ret = '<a href="' + href + '">' + text + '</a>';
      }

      return ret;
    };

    renderer.image = function(href, title, text) {
      return '<img class="responsive-img" src="' + href + '" alt="' + text + '">'
    };

    $scope.getFile = function(id) {
      var url = webRoot + '/api/file?id=' + id;
      $http.get(url)
        .success(function (data, status, headers, config) {
          if (status == 200) {
            if (typeof data === 'object' && data.hasOwnProperty(length) && data.length > 0) {
              $scope.file = data[0];
              $scope.renderFileDescription();
            }
            Materialize.toast('Get File Info DONE!', 4000);
          }
        })
        .error(function (data, status, headers, config) {
          Materialize.toast('Get File Info FAILED!', 4000);
        });
    };

    $scope.renderFileDescription = function() {
      $scope.description = $sce.trustAsHtml(marked($scope.file.description, {renderer: renderer}));
    };

    $scope.getFile(id);


  }]);