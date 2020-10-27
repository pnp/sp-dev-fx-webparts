// external js: isotope.pkgd.js
$(document).ready(function () {

  // init Isotope
  var $grid = $('.grid').isotope({
    itemSelector: '.sample-item',
    layoutMode: 'fitRows',
    sortAscending: false,
    sortBy: 'modified',
    getSortData: {
      title: '[data-title]',
      // number: '.number parseInt',
      modified: '[data-modified]'
    }
  });

  var filterFns = {
    hasTech: function() {
      return $(this).find(':not([data-technology=""])');
    },
    // show if number is greater than 50
    hasPnPjs: function() {
      var name = $(this).attr('data-technology');
      return name.indexOf('PnPjs') != -1;
    },
    hasCognitive: function() {
      var name = $(this).attr('data-technology');
      return name.indexOf('AzureCognitiveServices') != -1;
    },
    hasBot: function() {
      var name = $(this).attr('data-technology');
      return name.indexOf('AzureBotServices') != -1;
    },
    hasInsights: function() {
      var name = $(this).attr('data-technology');
      return name.indexOf('AzureAppInsights') != -1;
    },hasFunctions: function() {
      var name = $(this).attr('data-technology');
      return name.indexOf('AzureFunctions') != -1;
    },
    hasGitHub: function() {
      var name = $(this).attr('data-technology');
      return name.indexOf('GitHub') != -1;
    }
  };

  // bind filter button click
  $('.filters-button-group').on('click', 'button', function () {
    var filterValue = $(this).attr('data-filter');
    // use filterFn if matches value
    filterValue = filterFns[filterValue] || filterValue;
    $grid.isotope({ filter: filterValue });
  });
  // change is-checked class on buttons
  $('.button-group').each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'button', function () {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $(this).addClass('is-checked');
    });
  });

  // bind sort button click
  $('.sort-button-group').on('click', 'button', function () {

    /* Get the element name to sort */
    var sortValue = $(this).attr('data-sort-value');

    /* Get the sorting direction: asc||desc */
    var direction = $(this).attr('data-sort-direction');

    /* convert it to a boolean */
    var isAscending = (direction == 'asc');
    var newDirection = (isAscending) ? 'desc' : 'asc';

    /* pass it to isotope */
    $grid.isotope({ sortBy: sortValue, sortAscending: isAscending });

    $(this).attr('data-sort-direction', newDirection);
  });


  // Trigger animation on GIF hover
  $("a img[data-fullsize$='.gif']").hover((e) => {
    // on mouse enter
    var img = e.target;
    var customdata = $(img).data('fullsize');
    $(img).attr('src', customdata);
  }, (e) => {
    // on mouse leave
    var img = e.target;
    var customdata = $(img).data('orig');
    $(img).attr('src', customdata);
  });

  $("#author").on('change keyup paste', function () {
    console.log('I am pretty sure the text box changed');
    var selection = $('#author').val();
    if (selection !== "") {
      console.log('Selection', selection, `[data-author*='${selection}']`);
      $grid.isotope({ filter: `[data-author*='${selection}']` });
    } else {
      $grid.isotope({ filter: '*' });
    }

  });

  $("#keyword").on('change keyup paste', function () {
    var selection = $('#keyword').val();
    if (selection !== "") {
      $grid.isotope({ filter: `[data-keywords*='${selection}']` });
    } else {
      $grid.isotope({ filter: '*' });
    }

  });



  // Make samples data sortal
  $('#samplestable th').each(function (col) {
    $(this).hover(
      function () { $(this).addClass('focus'); },
      function () { $(this).removeClass('focus'); }
    );
    $(this).click(function () {
      if ($(this).is('.asc')) {
        $(this).removeClass('asc');
        $(this).addClass('desc selected');
        sortOrder = -1;
      }
      else {
        $(this).addClass('asc selected');
        $(this).removeClass('desc');
        sortOrder = 1;
      }
      $(this).siblings().removeClass('asc selected');
      $(this).siblings().removeClass('desc selected');
      var arrData = $('table').find('tbody >tr:has(td)').get();
      arrData.sort(function (a, b) {
        var val1 = $(a).children('td').eq(col).text().toUpperCase();
        var val2 = $(b).children('td').eq(col).text().toUpperCase();
        if ($.isNumeric(val1) && $.isNumeric(val2))
          return sortOrder == 1 ? val1 - val2 : val2 - val1;
        else
          return (val1 < val2) ? -sortOrder : (val1 > val2) ? sortOrder : 0;
      });
      $.each(arrData, function (index, row) {
        $('tbody').append(row);
      });
    });
  });
});