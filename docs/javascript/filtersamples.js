$(document).ready(function () {


  const filterText = $('#sample-listing').data("filter");
  const txtSearch = $('#post-search-input');
  var qsRegex = new Array();
  var buttonFilter;

  // init Isotope
  const $grid = $('#sample-listing').isotope({
    itemSelector: '.sample-thumbnail',
    layoutMode: 'fitRows',
    sortBy: 'modified',
    sortAscending: false,
    getSortData: {
      modified: '[data-modified]',
      title: '.sample-title'
    },
    filter: function () {
      var searchResult = true;
      qsRegex.forEach((term) => {
        if (!($(this).data("keywords").match(term))) {
          // If any term doesn't match, return false
          searchResult = false;
        }
      })
      const buttonResult = buttonFilter ? $(this).is(buttonFilter) : true;
      return searchResult && buttonResult;
    },
    fitRows: {
      columnWidth: '.grid-sizer'
    }
  });

  // Display/hide a message when there are no results
  $grid.on('arrangeComplete', function (_event, filteredItems) {
    if (filteredItems.length > 0) {
      // hide message 
      $("#loading").hide();
      $("#noresults").hide();
    } else {
      // show message; 
      $("#noresults").show();
      $("#loading").hide();
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

  txtSearch.on('change keyup paste', debounce(function () {
    var searchQuery = txtSearch.val().toString();
    searchResult(searchQuery);
  }, 200));

  //retrieve the q querystring parameter; if it exists, use it to filter the samples
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('q')) {
    const searchQuery = urlParams.get('q');
    txtSearch.val(searchQuery);
    searchResult(searchQuery);
  }


  function searchResult(query) {
    if (!query) {
      qsRegex = new Array();
    } else {
      qsRegex = query.match(/\w+|"[^"]+"/gi);
      let i = qsRegex.length;
      while (i--) {
        qsRegex[i] = qsRegex[i].replace(/"/gi, "");
      }
    }
    $grid.isotope();
  }
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


});