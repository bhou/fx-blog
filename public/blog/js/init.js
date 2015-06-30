$(document).ready(function () {
  $(".button-collapse").sideNav();

  (function ($) {
    $(function () {

      $('.button-collapse').sideNav();
      $('.parallax').parallax();

    }); // end of document ready
  })(jQuery); // end of jQuery name space

  // custom renderer
  var customMarked = function (text) {
    var newRenderer = new marked.Renderer();

    newRenderer.image = function (href, title, text) {
      return '<p class="caption" style="font-size: 1.4em;">' +
        '<img class="responsive-img" src="' + href + '"></p>';
    };

    newRenderer.paragraph = function (text) {
      return '<p class="caption" style="font-size: 1.4em;">'
        + text + '</p>';
    };
    return marked(text, {
      renderer: newRenderer,
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false
    });
  };

  // init epic editor
  if ($('#epiceditor').length > 0) {
    var editor = new EpicEditor({
      textarea: 'editor-article-content',
      parser: customMarked,
      focusOnLoad: true,
      theme: {
        base: '/../../EpicEditor/themes/base/epiceditor.css',
        editor: '/../../EpicEditor/themes/editor/epic-dark.css'
      },
      autogrow: {
        minHeight: 750
      }
    }).load();
  }

  $("#editor-submit").click(function () {
    var content = editor.exportFile();

    var digest = $(editor.exportFile(null, 'html')).text();
    if (digest.length > 300) {
      digest = digest.substring(0, 300);
    }

    var type = 'blog';
    if ($('input[name=type]:checked').attr('id') === 'editor-article-type-page') {
      type = 'page';
    }

    var title = $("#editor-title").val();

    var featuredImage = $("#editor-feature-image").val();

    var tags = $("#editor-tags").val();
    if (tags) {
      tags = tags.replace(/ /g, '');
      tags = tags.split(',');
    } else {
      tags = [];
    }

    var postData = {
      title: title,
      featuredImage: featuredImage,
      digest: digest,
      content: content,
      type: type,
      tags: tags
    };

    var idInput = $("#editor-article-id");
    if (idInput.length > 0) {
      postData.id = idInput.val();
    }

    $.post("/article", postData, function (data) {
      if (data.code != 200) {
        Materialize.toast('Update FAILED!', 4000);
      } else {
        if ($("#editor-delete").length <= 0) {
          if (type == 'page') {
            window.location.href = webRoot + "/pages";
          } else {
            window.location.href = webRoot + "/";
          }
        }
        Materialize.toast('Update DONE!', 4000);
      }
    }, "json");
  });

  $("#editor-delete").click(function () {
    var postData = {};
    var idInput = $("#editor-article-id");
    if (idInput.length > 0) {
      postData.id = idInput.val();
    }

    $.post("/blog/delete", postData, function (data) {
      if (data.code != 200) {
        Materialize.toast('Delete FAILED!', 4000);
      } else {
        window.location.href = "/blog";
      }
    }, "json");
  });


  // FLUID YOUTUBE VIDEO
  // END OF FLUID YOUTUBE VIDEO

});  // END OF DOCUMENT READY