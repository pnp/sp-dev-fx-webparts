# Samples by SPFx Version

 <div class="well">
  <div class="button-group filters-button-group">
              <button class="button is-checked" data-filter="*">All</button>
              <button class="button" data-filter="[data-spfx='1.9.1']">1.9.1</button>
              <button class="button" data-filter="[data-spfx='1.9.0']">1.9.0</button>
              <button class="button" data-filter="[data-spfx='1.8.2']">1.8.2</button>
              <button class="button" data-filter="[data-spfx='1.8.1']">1.8.1</button>
              <button class="button" data-filter="[data-spfx='1.8.0']">1.8.0</button>
              <button class="button" data-filter="[data-spfx='1.7.1']">1.7.1</button>
              <button class="button" data-filter="[data-spfx='1.7.0']">1.7.0</button>
              <button class="button" data-filter="[data-spfx='1.6.0']">1.6.0</button>
              <button class="button" data-filter="[data-spfx='1.5.1']">1.5.1</button>
              <button class="button" data-filter="[data-spfx='1.4.1']">1.4.1</button>
              <button class="button" data-filter="[data-spfx='1.4.0']">1.4.0</button>
              <button class="button" data-filter="[data-spfx='1.3.4']">1.3.4</button>
              <button class="button" data-filter="[data-spfx='1.3.0']">1.3.0</button>
              <button class="button" data-filter="[data-spfx='GA']">GA</button>
              <button class="button"
                data-filter="[data-spfx='rc0'],[data-spfx='drop5'],[data-spfx='drop4'],[data-spfx='drop2'],[data-spfx='drop1']">Pre-release</button>
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
<span class="location spfx">
{% if sample.spfx == "drop0" %}
            <img src="https://img.shields.io/badge/drop-{{ sample.spfx }}-red.svg" alt="{{ sample.spfx }}"/>
        {% elif sample.spfx == "drop1" %}
            <img src="https://img.shields.io/badge/drop-{{ sample.spfx }}-red.svg" alt="{{ sample.spfx }}"/>
        {% elif sample.spfx == "drop2" %}
            <img src="https://img.shields.io/badge/drop-{{ sample.spfx }}-red.svg" alt="{{ sample.spfx }}"/>
        {% elif sample.spfx == "drop3" %}
            <img src="https://img.shields.io/badge/drop-{{ sample.spfx }}-red.svg" alt="{{ sample.spfx }}"/>
        {% elif sample.spfx == "drop4" %}
            <img src="https://img.shields.io/badge/drop-{{ sample.spfx }}-red.svg" alt="{{ sample.spfx }}"/>
        {% elif sample.spfx == "drop5" %}
            <img src="https://img.shields.io/badge/drop-{{ sample.spfx }}-red.svg" alt="{{ sample.spfx }}"/>
        {% elif sample.spfx == "rc0" %}
            <img src="https://img.shields.io/badge/drop-{{ sample.spfx }}-red.svg" alt="{{ sample.spfx }}"/>
        {% else %}
            <img src="https://img.shields.io/badge/version-{{ sample.spfx }}-green.svg" alt="{{ sample.spfx }}"/>
        {% endif %}
</span>
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

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/docs/samples/spfx" />