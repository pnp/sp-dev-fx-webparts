# Samples by JavaScript Framework

You can build client-side web parts using the [many of the JavaScript frameworks](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/tools-and-libraries) you're already familiar with. Use the filters below to find samples by JavaScript framework.

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
    <button class="button" data-filter="[data-framework='Handlebars']">Handlebars</button>
    <button class="button" data-filter="[data-framework='Other']">Other</button>
  </div>
</div>

<div class="grid">

{% for sample in samples %}

<div class="sample-item" data-framework="{{sample.framework}}" data-spfx="{{sample.spfx}}" data-modified="{{sample.modified}}" data-title="{{ sample.title }}"  data-thumbnail="{{sample.thumbnail}}">
  <div class="sample">
    <div class="sample-video"><i class="ms-Icon ms-Icon--VideoSolid" aria-hidden="true"></i></div>
    <div class="sample-img">
      <a class="sample-link"
        href="{{sample.url}}"
        title="{{sample.summary}}">
        <picture>
          <img src="./img/thumbnails/sm/{{ sample.name }}.png" width="302" alt="{{sample.name}}" data-fullsize="{{sample.thumbnail}}" data-orig="./img/thumbnails/sm/{{ sample.name }}.png"/>
        </picture>
      </a>
    </div>
  </div>
      <a href="{{sample.url}}"
      title="{{ sample.summary }}">
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

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/docs/samples/framework" />