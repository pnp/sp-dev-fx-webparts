# Samples by Year

The SharePoint Framework is constantly evolving. Use the filters below to see how the samples have changed over the years.

 <div class="well">
  <div class="button-group filters-button-group">
   <button class="button is-checked" data-filter="*">All</button>
              <button class="button" data-filter="[data-year='2019']">2019</button>
              <button class="button" data-filter="[data-year='2018']">2018</button>
              <button class="button" data-filter="[data-year='2017']">2017</button>
              <button class="button" data-filter="[data-year='2016']">2016</button>
  </div>

  <!-- <div class="button-group sort-button-group"> 
    <button class="button" data-sort-direction="asc" data-sort-value="original-order" type="button">Sort <i class="ms-Icon ms-Icon--Ascending" aria-hidden="true" style='display:none;'></i><i class="ms-Icon ms-Icon--Descending" aria-hidden="true"  style='display:none;'></i></button> 
    <button class="button" data-sort-direction="asc" data-sort-value="title" type="button">Title <i class="ms-Icon ms-Icon--Ascending" aria-hidden="true"  style='display:none;'></i><i class="ms-Icon ms-Icon--Descending" aria-hidden="true"  style='display:none;'></i></button> 
    <button class="button is-checked" data-sort-direction="desc" data-sort-value="modified" type="button">Modified  <i class="ms-Icon ms-Icon--Ascending" aria-hidden="true"  style='display:none;'></i><i class="ms-Icon ms-Icon--Descending" aria-hidden="true"></i></button>
  </div> -->
</div>

<div class="grid">

{% for sample in samples %}

<div class="sample-item" data-framework="{{sample.framework}}" data-spfx="{{sample.spfx}}" data-year="{{sample.year}}" data-modified="{{sample.modified}}" data-title="{{ sample.title }}">
  <div class="sample">
  {% if sample.thumbnailtype == "video" %}
    <div class="sample-video"><i class="ms-Icon ms-Icon--VideoSolid" aria-hidden="true"></i></div>
    {% endif %}
    <div class="sample-img">
      <a class="sample-link"
        href="{{sample.url}}"
        title="{{sample.title}}">
        <picture>
          <img src="../../img/thumbnails/sm/{{ sample.name }}.png" width="302" alt="{{sample.name}}" data-fullsize="{{sample.thumbnail}}" data-orig="../../img/thumbnails/sm/{{ sample.name }}.png"/>
        </picture>
      </a>
    </div>
  </div>
      <a href="{{sample.url}}"
      title="{{ sample.title }}">
<span class="location" title="Modified: {{sample.year}}">{{ sample.year }}</span>
  <h2 class="name">
      {{sample.title}}</h2>
      <div class="sample-activity">
  <span class="author" title="{{ sample.author }}">{{ sample.author }}</span>
  <span class="modified">Modified {{ sample.modifiedtext }}</span>
  </div>
  </a>

</div>
    {% endfor %}
</div>

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/docs/samples/year" />