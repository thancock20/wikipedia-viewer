$(document).ready(function() {

  // search on typing
  $('#search-box').keyup(function() {

    // shrink and uncenter items to make room for search results
    $('#random-page').addClass('btn-xs');
    $('#new-page').removeClass('vertical-center');
    $('#logo').addClass('small-logo');
    
    var searchTerm = $('#search-box').val();
    
    // get results from Wikipedia API
    $.ajax({
      url: '//en.wikipedia.org/w/api.php',
      data: {
        action: 'query',
        list: 'search',
        srsearch: searchTerm,
        srprop: 'snippet',
        format: 'json'
      },
      dataType: 'jsonp',
      success: function(results) {
        
        // initialize handlbars and show results on page
        var source = $("#result-template").html();
        var template = Handlebars.compile(source);
        $('#results-list').html(template(results));
      }
    });
  });

  // changes title to snake_case for use in URL
  Handlebars.registerHelper('snakeCase', function(title) {
    return title.replace(/\s+/g, '_');
  });
});