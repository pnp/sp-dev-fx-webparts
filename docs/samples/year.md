# Samples by Year

The SharePoint Framework is constantly evolving. Use the filters below to see how the samples have changed over the years.

To learn more about how to use these samples, please refer to our [getting started](../gettingstarted/index.md) section.

 <div class="well">
  <div class="button-group filters-button-group">
   <button class="button is-checked" data-filter="*">All</button>
  <button class="button" data-filter="[data-modified^='2020-']">2020</button>
  <button class="button" data-filter="[data-modified^='2019-']">2019</button>
  <button class="button" data-filter="[data-modified^='2018-']">2018</button>
  <button class="button" data-filter="[data-modified^='2017-']">2017</button>
  <button class="button" data-filter="[data-modified^='2016-']">2016</button>
  </div>
</div>

<div class="grid">

{% for sample in samples %}

<div class="sample-item" data-framework="{{sample.framework}}" data-spfx="{{sample.spfx}}" data-modified="{{sample.modified}}" data-title="{{ sample.title }}" data-thumbnail="{{sample.thumbnail}}">
  <div class="sample">
    <div class="sample-video"><i class="ms-Icon ms-Icon--VideoSolid" aria-hidden="true"></i></div>
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