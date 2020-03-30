# Samples by Framework

You can build client-side web parts using the frameworks you're already familiar with. Use the filters below to find samples by framework.

To learn more about how to use these samples, please refer to our [getting started](./gettingstarted/index.md) section.

 <div class="well">
  <div class="button-group filters-button-group">
    <button class="button is-checked" data-filter="*">All</button>
    <button class="button" data-filter="[data-framework='Angular']">Angular</button>
    <button class="button" data-filter="[data-framework='jQuery']">jQuery</button>
    <button class="button" data-filter="[data-framework='Javascript']">Javascript</button>
    <button class="button" data-filter="[data-framework='Knockout']">Knockout</button>
    <button class="button" data-filter="[data-framework='React']">React</button>
    <button class="button" data-filter="[data-framework='VueJS']">VueJS</button>
    <button class="button" data-filter="[data-framework='Other']">Other</button>
  </div>

  <!-- <div class="button-group sort-button-group"> 
    <button class="button" data-sort-direction="asc" data-sort-value="original-order" type="button">Sort <i class="ms-Icon ms-Icon--Ascending" aria-hidden="true" style='display:none;'></i><i class="ms-Icon ms-Icon--Descending" aria-hidden="true"  style='display:none;'></i></button> 
    <button class="button" data-sort-direction="asc" data-sort-value="title" type="button">Title <i class="ms-Icon ms-Icon--Ascending" aria-hidden="true"  style='display:none;'></i><i class="ms-Icon ms-Icon--Descending" aria-hidden="true"  style='display:none;'></i></button> 
    <button class="button is-checked" data-sort-direction="desc" data-sort-value="modified" type="button">Modified  <i class="ms-Icon ms-Icon--Ascending" aria-hidden="true"  style='display:none;'></i><i class="ms-Icon ms-Icon--Descending" aria-hidden="true"></i></button>
  </div> -->
</div>

<div class="grid">

{% for sample in samples %}

<div class="sample-item" data-framework="{{sample.framework}}" data-spfx="{{sample.spfx}}" data-modified="{{sample.modified}}" data-title="{{ sample.title }}"  data-thumbnail="{{sample.thumbnail}}">
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
<span class="location" title="Framework: {{sample.framework}}">{{ sample.framework }}</span>
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

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/docs/samples/framework" />n 