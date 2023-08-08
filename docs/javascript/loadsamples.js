/**
 * This file is unique for each sample browser. It contains the logic specific to each repo for loading the samples as needed.
 */
var jsonPath = "https://pnp.github.io/sp-dev-fx-webparts/samples.json";
if (window.location.host.toLowerCase() !== "pnp.github.io") {
  // When serving locally there is no /teams-dev-samples in the path
  jsonPath = window.location.origin + "/sp-dev-fx-webparts/samples.json";
  console.log(`Reading samples from ${jsonPath}`);
}

/**
 * Reads a sample metadata and returns a pre-populated HTML element
 * @param {*} sample 
 * @returns 
 */
function loadSample(sample, filter) {
  try {
    var title = _.escape(sample.title);
    var escapedDescription = _.escape(sample.shortDescription);

    var shortDescription = sample.shortDescription; //.length > 80 ? sample.shortDescription.substr(0, 77)  : sample.shortDescription;
    var thumbnail = "https://pnp.github.io/sp-dev-fx-webparts/img/_nopreview.png";
    //var categories = sample.categories[0];

    if (sample.thumbnails && sample.thumbnails.length > 0) {
      thumbnail = sample.thumbnails[0].url;
    }


    var sampleType = "";
    var sampleTypeName = "";

    if (sample.categories && sample.categories.length > 0) {
      const categories = sample.categories[0];
      switch (categories) {
        case "SPFX-FIELD-EXTENSION":
          sampleType = "field";
          sampleTypeName = "Field customizer";
          break;
        case "SPFX-COMMAND-EXTENSION":
          sampleType = "command";
          sampleTypeName = "ListView command set";
          break;
        case "SPFX-SEARCHQUERY-EXTENSION":
          sampleType = "search";
          sampleTypeName = "Search query extension";
          break;
        case "SPFX-APPLICATION-EXTENSION":
          sampleType = "appcustomizer";
          sampleTypeName = "Application customizer";
          break;
        case "SPFX-FORM-EXTENSION":
          sampleType = "form";
          sampleTypeName = "Form customizer";
          break;
        default:
          sampleType = "webpart";
          sampleTypeName = "Web part";
          break;
      }
    } else {
      sampleType = "webpart";
      sampleTypeName = "Web part";
    }

    var framework = "";
    var SPFxVersion = "";
    var outlookCompatible = false;
    var teamsCompatible = false;
    var pnpControls = "";

    var metadata = sample.metadata;
    metadata.forEach(meta => {
      switch (meta.key) {
        case "CLIENT-SIDE-DEV":
          framework = meta.value;
          break;
        case "SPFX-VERSION":
          SPFxVersion = meta.value;
          break;
        case "SPFX-OUTLOOKADDIN":
          outlookCompatible = meta.value;
          break;
        case "SPFX-TEAMSPERSONALAPP":
        case "SPFX-TEAMSTAB":
          teamsCompatible = meta.value;
          break;
        case "PNPCONTROLS":
          pnpControls = meta.value;
          break;
        default:
          break;
      }
    });
    const dtModified = new Date(sample.updateDateTime);

    var subscription = SPFxVersion.startsWith("1.5.") || SPFxVersion == "1.4.1" || SPFxVersion.startsWith("1.3.") || SPFxVersion == "GA";
    var compatible2019 = SPFxVersion == "1.4.1" || SPFxVersion.startsWith("1.3.") || SPFxVersion == "GA";
    var compatible2016 = SPFxVersion == "GA" && sampleType == "webpart";
    var modified = moment(dtModified).toISOString();
    var authors = sample.authors;
    var authorsList = "";
    var authorAvatars = "";
    var authorName = "";
    var authorsGitHub = "";
    var productTag = framework.toLowerCase();
    var productName = framework;


    // Build the authors array
    if (authors && authors.length > 0) {
      authors.forEach(author => {
        if (authorsList !== "") {
          authorsList = authorsList + ", ";
        }
        authorsList = authorsList + author.name;
        authorsGitHub = authorsGitHub + " " + author.gitHubAccount;

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
    } else {
      console.log("Sample has no authors", sample);
    }

    // Extract tags
    var tags = "";
    $.each(sample.tags, function (_u, tag) {
      tags = tags + "#" + tag + ",";
    });

    // Build a keyword tag for searching
    var keywords = title + " " + escapedDescription + " " + authorsList + " " + authorsGitHub + " " + tags + " " + pnpControls;
    keywords = keywords.toLowerCase();

    // Build the HTML to insert
    var $items = $(`
<a class="sample-thumbnail" href="${sample.url}" data-type="${sampleType}" data-modified="${modified}" data-title="${title}" data-keywords="${keywords}" data-tags="${tags}" data-framework="${framework}" data-spfx="${SPFxVersion}" data-outlook="${outlookCompatible}" data-teams="${teamsCompatible}" data-sp2016="${compatible2016}" data-sp2019="${compatible2019}" data-subscription="${subscription}" data-pnpcontrols="${pnpControls}"
>
  <div class="sample-inner">
    <div class="sample-preview">
      <img src="${thumbnail}" loading="lazy" alt="${title}">
    </div>
    <div class="sample-details">
      <div class="sample-item ${sampleType}" title="Type: ${sampleTypeName}">${sampleTypeName}</div>
      <div class="producttype-item ${productTag}" title="Framework: ${productName}">${productName}</div>
      <p class="sample-title" title="${sample.title}">${sample.title}</p>
      <p class="sample-description" title='${escapedDescription}'>${shortDescription}</p>
      <div class="sample-activity">
        ${authorAvatars}
        <div class="activity-details">
          <span class="sample-author" title="${authorsList}">${authorName}</span>
          <span class="sample-date">Modified ${dtModified.toDateString()}</span>
        </div>
      </div>
    </div>
  </div>
</a>`);

    return $items;
  } catch (error) {
    console.log("Error with one sample", error, sample);
  }
  return null;
}