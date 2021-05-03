// external js: isotope.pkgd.js
$(document).ready(function () {

  var jsonPath = "https://pnp.github.io/sp-dev-fx-webparts/samples.json";

  var filterText = $('#sample-listing').data("filter");

  // init Isotope
  var $grid = $('#sample-listing').isotope({
    itemSelector: '.sample-thumbnail',
    layoutMode: 'fitRows',
    sortBy : 'modified',
    sortAscending: false,
    getSortData: {
      modified: '[data-modified]',
      title: '.sample-title'
    }
  });

  // Get the JSON
  $.getJSON(jsonPath, function (data) {
    var asc = true;
    var prop = "updateDateTime";

    // Sort data descending order
    data = data.sort(function(a, b) {
      try {
        if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);  
      } catch (error) {
        return 0;
      }
    });

    $.each(data, function (_u, sample) {

      try {
        var title = _.escape(sample.title);
        var escapedDescription = _.escape(sample.shortDescription);

        var shortDescription = sample.shortDescription; //.length > 80 ? sample.shortDescription.substr(0, 77)  : sample.shortDescription;
        var thumbnail = "https://pnp.github.io/sp-dev-fx-webparts/img/_nopreview.png";
        //var categories = sample.categories[0];

        if (sample.thumbnails && sample.thumbnails.length > 0) {
          thumbnail = sample.thumbnails[0].url;
        }

        var framework = ""; 
        var spfxversion = "";
        var outlookCompatible = false;
        var teamsCompatible = false;
        var pnpcontrols = "";
        
        var metadata = sample.metadata;
        metadata.forEach(meta => {
          switch (meta.key) {
            case "CLIENT-SIDE-DEV":
              framework = meta.value;  
              break;
          case "SPFX-VERSION":
              spfxversion = meta.value;
              break;
          case "SPFX-OUTLOOKADDIN":
              outlookCompatible = meta.value;
              break;
          case "SPFX-TEAMSPERSONALAPP":
          case "SPFX-TEAMSTAB":
              teamsCompatible = meta.value;
              break;
          case "PNPCONTROLS":
              pnpcontrols = meta.value;
              break;
            default:
              break;
          }
        });

        var compatible2019 = spfxversion == "1.4.1" || spfxversion.startsWith("1.3.")  || spfxversion == "GA";
        var compatible2016 =  spfxversion == "GA";


        var modified = new Date(sample.updateDateTime).toString().substr(4).substr(0, 12);

        var authors = sample.authors;
        var authorsList = "";
        var authorAvatars = "";
        var authorName = "";

        if (authors.length < 1) {
          console.log("Sample has no authors", sample);
        } else {
          authors.forEach(author => {
            if (authorsList !== "") {
              authorsList = authorsList + ", ";
            }
            authorsList = authorsList + author.name;
  
            var authorAvatar = `<div class="author-avatar">
              <div role="presentation" class="author-coin">
                <div role="presentation" class="author-imagearea">
                  <div class="image-400">
                    <img class="author-image" loading="lazy" src="${author.pictureUrl}" alt="${author.name}" title="${author.name}">
                  </div>
                </div>
              </div>
            </div>`;
            authorAvatars = authorAvatar + authorAvatars;
          });
  
          authorName = authors[0].name;
          if (authors.length > 1) {
            authorName = authorName + ` +${authors.length - 1}`;
          }
  
        }

        var tags = "";
        $.each(sample.tags, function (_u, tag) {
          tags = tags + "#" + tag + ",";
        });

        var keywords = title + " " + escapedDescription + " " + authorsList + " " + tags + " "+ pnpcontrols;
        keywords = keywords.toLowerCase();

        var productTag = framework.toLowerCase();
        var productName = framework;

        // switch (categories) {
        //   case "POWERAPPS":
        //     productTag = "powerapps";
        //     productName = "Power Apps";
        //     break;

        //   default:
        //     break;
        // }

        var $items = $(`
<a class="sample-thumbnail" href="${sample.url}" data-modified="${sample.modified}" data-title="${title}" data-keywords="${keywords}" data-tags="${tags}" data-framework="${framework}" data-spfx="${spfxversion}" data-outlook="${outlookCompatible}" data-teams="${teamsCompatible}" data-sp2016="${compatible2016}"  data-sp2019="${compatible2019}"
>
  <div class="sample-inner">
    <div class="sample-preview">
      <img src="${thumbnail}" loading="lazy" alt="${title}">
    </div>
    <div class="sample-details">
      <div class="producttype-item ${productTag}">${productName}</div>
      <p class="sample-title" title="${sample.title}">${sample.title}</p>
      <p class="sample-description" title='${escapedDescription}'>${shortDescription}</p>
      <div class="sample-activity">
        ${authorAvatars}
        <div class="activity-details">
          <span class="sample-author" title="${authorsList}">${authorName}</span>
          <span class="sample-date">Modified ${modified}</span>
        </div>
      </div>
    </div>
  </div>
</a>`);

        if (filterText !== undefined && filterText !== "") {
          // Skip this sample as it doesn't meet the filter
          ;
        } else {
          //$grid.isotope( 'appended', elements );
          $grid.append($items)
            // add and lay out newly appended items
            .isotope('appended', $items);
        }
      } catch (error) {
        console.log("Error with one sample", error, sample);
      }
    });

    // Update the sort
    $grid.isotope('updateSortData').isotope();
  });

  // filter functions
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
  $('#filters').on('click', '.filter-choice', function () {
    var filterValue = $(this).attr('data-filter');
    // use filterFn if matches value
    filterValue = filterFns[filterValue] || filterValue;
    $grid.isotope({ filter: filterValue });
  });
  // change is-checked class on buttons
  $('.filter-list').each(function (_i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', '.filter-choice', function () {
      $buttonGroup.find('.active').removeClass('active');
      $(this).addClass('active');
    });
  });

  // // bind filter button click
  // $('.filters-button-group').on('click', 'button', function () {
  //   var filterValue = $(this).attr('data-filter');
  //   // use filterFn if matches value
  //   filterValue = filterFns[filterValue] || filterValue;
  //   $grid.isotope({ filter: filterValue });
  // });
  // // change is-checked class on buttons
  // $('.button-group').each(function (i, buttonGroup) {
  //   var $buttonGroup = $(buttonGroup);
  //   $buttonGroup.on('click', 'button', function () {
  //     $buttonGroup.find('.is-checked').removeClass('is-checked');
  //     $(this).addClass('is-checked');
  //   });
  // });

  // // bind sort button click
  // $('.sort-button-group').on('click', 'button', function () {

  //   /* Get the element name to sort */
  //   var sortValue = $(this).attr('data-sort-value');

  //   /* Get the sorting direction: asc||desc */
  //   var direction = $(this).attr('data-sort-direction');

  //   /* convert it to a boolean */
  //   var isAscending = (direction == 'asc');
  //   var newDirection = (isAscending) ? 'desc' : 'asc';

  //   /* pass it to isotope */
  //   $grid.isotope({ sortBy: sortValue, sortAscending: isAscending });

  //   $(this).attr('data-sort-direction', newDirection);
  // });

  
  $("#post-search-input").on('change keyup paste', function () {
    var selection = $('#post-search-input').val();
    if (selection !== "") {
      selection = selection.toLowerCase();
      $grid.isotope({ filter: `[data-keywords*='${selection}']` });
    } else {
      $grid.isotope({ filter: '*' });
    }
  });

  // See if there are any passed parameters
  try {
    var urlParams = new URLSearchParams(window.location.search);
    var query = urlParams.get('query');
    if (query !== "") {
      $('#post-search-input').val(query).change();
    }
    
  } catch (error) {
    
  }


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