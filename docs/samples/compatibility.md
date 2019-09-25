# Samples by Compatibility

All samples are compatible with SharePoint Online. If you wish to find web parts that were specifically designed for SharePoint 2019 or Microsoft Teams, use the filters below.
 <div class="well">
  <div class="button-group filters-button-group">
    <button class="button is-checked" data-filter="*">All</button>
    <button class="button" data-filter="*">SharePoint Online</button>
    <button class="button" data-filter="[data-compatibility*='SharePoint 2019'],[data-spfx='1.4.1']">SharePoint
      2019</button>
    <button class="button" data-filter="[data-compatibility*='Microsoft Teams']">Microsoft Teams</button>
  </div>
</div>

<div class="grid">

{% for sample in samples %}

<div class="sample-item" data-framework="{{sample.framework}}" data-spfx="{{sample.spfx}}" data-year="{{sample.year}}" data-modified="{{sample.modified}}" data-title="{{ sample.title }}" data-compatibility="{{ sample.compatibility }}">
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
<span class="location" title="Compatible with: {{sample.compatibility}}">{{ sample.compatibility }}</span>
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

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/docs/samples/compatibility" />