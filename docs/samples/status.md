# Samples by Status

As the SharePoint Framework evolves, some features are deprecated to make room for new ones, which may affect the working status of our samples.

Use the filters to find samples by working status.

If you encounter any issues with the samples, [create an issue](https://github.com/SharePoint/sp-dev-fx-webparts/issues) so that we can notify the original authors.

 <div class="well">
  <div class="button-group filters-button-group">
              <button class="button is-checked" data-filter="*">All</button>
              <button class="button" data-filter="[data-status='']">Working</button>
              <button class="button" data-filter="[data-status='Deprecated']">Deprecated</button>
              <button class="button" data-filter="[data-status='Incomplete']">Incomplete</button>
              <button class="button" data-filter=":not([data-status=''])">Other</button>
  </div>
</div>

<div class="grid">

{% for sample in samples %}

<div class="sample-item" data-framework="{{sample.framework}}" data-spfx="{{sample.spfx}}" data-modified="{{sample.modified}}" data-title="{{ sample.title }}" data-status="{{ sample.status}}"  data-thumbnail="{{sample.thumbnail}}">
  <div class="sample">
  {% if sample.thumbnailtype == "video" %}
    <div class="sample-video"><i class="ms-Icon ms-Icon--VideoSolid" aria-hidden="true"></i></div>
    {% endif %}
    <div class="sample-img">
      <a class="sample-link"
        href="{{sample.url}}"
        title="{{sample.summary}}">
        <picture>
          <img src="../../img/thumbnails/sm/{{ sample.name }}.png" width="302" alt="{{sample.name}}" data-fullsize="{{sample.thumbnail}}" data-orig="../../img/thumbnails/sm/{{ sample.name }}.png"/>
        </picture>
      </a>
    </div>
  </div>
      <a href="{{sample.url}}"
      title="{{ sample.summary }}">
<span class="location" title="Status: {{sample.statustext}}">{{ sample.status }}</span>
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

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/docs/samples/status" />