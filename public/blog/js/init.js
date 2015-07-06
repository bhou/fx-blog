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
  // END CUSTOM RENDERER

  // START INIT EPIC EDITOR
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
  // END INIT EPIC EDITOR

  // START EDITOR SUBMIT
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
  // END EDITOR SUBMIT

  // START EDITOR DELETE
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
  // END EDITOR DELETE

  // START TOC
  if ($("#toc").length > 0) {
    $("#toc").toc({
      'selectors': 'h1,h2,h3,h4,h5', //elements to use as headings
      'container': 'body', //element to find all selectors in
      'smoothScrolling': true, //enable or disable smooth scrolling on click
      'prefix': 'toc', //prefix for anchor tags and class names
      'onHighlight': function (el) {
      }, //called when a new section is highlighted
      'highlightOnScroll': true, //add class to heading that is currently in focus
      'highlightOffset': 100, //offset to trigger the next headline
      'anchorName': function (i, heading, prefix) { //custom function for anchor name
        return prefix + i;
      },
      'headerText': function (i, heading, $heading) { //custom function building the header-item text
        return $heading.text();
      },
      'itemClass': function (i, heading, $heading, prefix) { // custom function for item class
        return $heading[0].tagName.toLowerCase();
      }
    });

    $("#toc ul").attr('class', 'section table-of-contents');

    $('#toc').pushpin({ top: $('#toc').offset().top, offset: 90 });
  }

  $('.scrollspy').scrollSpy();
  // END TOC
});  // END OF DOCUMENT READY