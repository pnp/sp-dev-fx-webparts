// external js: isotope.pkgd.js

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

// bind filter button click
$('.filters-button-group').on('click', 'button', function () {
  var filterValue = $(this).attr('data-filter');
  // use filterFn if matches value
  //filterValue = filterFns[filterValue] || filterValue;
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
$('.sort-button-group').on( 'click', 'button', function() {

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

