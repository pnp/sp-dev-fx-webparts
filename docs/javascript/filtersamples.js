// external js: isotope.pkgd.js

/***
 * This is a generic isotope filter for samples
 */

$(document).ready(function () {
  var filterText = $('#sample-listing').data("filter");
  var qsRegex;
  var buttonFilter;

  // init Isotope
  var $grid = $('#sample-listing').isotope({
    itemSelector: '.sample-thumbnail',
    layoutMode: 'fitRows',
    sortBy: 'modified',
    sortAscending: false,
    getSortData: {
      modified: '[data-modified]',
      title: '.sample-title'
    },
    filter: function () {
      var searchResult = qsRegex ? $(this).data("keywords").match(qsRegex) : true;
      var buttonResult = buttonFilter ? $(this).is(buttonFilter) : true;
      return searchResult && buttonResult;
    }
  });

  // Display/hide a message when there are no results
  $grid.on('arrangeComplete', function (_event, filteredItems) {
    if (filteredItems.length > 0) {
      // hide message 
      $("#noresults").hide();
    } else {
      // show message; 
      $("#noresults").show();
    }
  });

  // Get the JSON
  $.getJSON(jsonPath, function (data) {
    var asc = true;
    var prop = "updateDateTime";

    // Sort data descending order
    data = data.sort(function (a, b) {
      try {
        if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      } catch (error) {
        return 0;
      }
    });

    $.each(data, function (_u, sample) {

      var item = loadSample(sample, filterText);

      if (item !== null) {
        $grid.append(item)
          // add and lay out newly appended items
          .isotope('appended', item);
      }

    });

    // Update the sort
    $grid.isotope('updateSortData').isotope();
  });

  // Get the list of filters to use
  var filter = $('#filters .filter-choice');

  // Get the search box
  var search = $('#post-search-input');

  $('.filter-list').each(function (_i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', '.filter-choice', function () {
      $buttonGroup.find('.active').removeClass('active');
      $(this).addClass('active');
      var filters = [];

      filter.filter('.active').each(function () {
        filters.push($(this).data("filter"));
      });
      //filters = filters.join(', ');    //OR
      filters = filters.join('');         //AND
      buttonFilter = filters;
      $grid.isotope();

    });
  });

  search.on('change keyup paste', debounce(function () {
    qsRegex = new RegExp(search.val(), 'gi');
    $grid.isotope();
  }, 200));

  // debounce so filtering doesn't happen every millisecond
  function debounce(fn, threshold) {
    var timeout;
    return function debounced() {
      if (timeout) {
        clearTimeout(timeout);
      }
      function delayed() {
        fn();
        timeout = null;
      }
      timeout = setTimeout(delayed, threshold || 100);
    };
  }

  // See if there are any passed parameters
  try {
    var urlParams = new URLSearchParams(window.location.search);
    var query = urlParams.get('query');
    if (query !== "") {
      search.val(query).change();
    }

  } catch (error) {
    // Be vewy vewy quiet
  }
});