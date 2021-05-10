> NOTE: This file is no longer used. I just left it here because I need to move the filters to another page.

# Samples by Technology

Use the filters below to find samples which demonstrate how to use various Microsoft technologies.

To learn more about how to use these samples, please refer to our [getting started](../gettingstarted/index.md) section.

 <div class="well">
  <div class="button-group filters-button-group">
   <button class="button is-checked" data-filter="hasTech">All</button>
<button class="button" data-filter="hasInsights">Azure Application Insights</button>
<button class="button" data-filter="hasBot">Azure Bot Services</button>
<button class="button" data-filter="[data-technology*='AzureCognitiveServices']">Azure Cognitive Services</button>
<button class="button" data-filter="hasFunctions">Azure Functions</button>
<button class="button" data-filter="hasGitHub">GitHub</button>
<button class="button" data-filter="[data-technology*='MSGraph']">Microsoft Graph</button>
<button class="button" data-filter="[data-technology*='MGT']">Microsoft Graph Toolkit</button>
<button class="button" data-filter="hasPnPjs">PnPjs</button>
  </div>
</div>

<div class="grid">

{% for sample in samples|sort(attribute='modified', reverse=True) %}

<div class="sample-item" data-framework="{{sample.framework}}" data-spfx="{{sample.spfx}}" data-modified="{{sample.modified}}" data-title="{{ sample.title }}" data-thumbnail="{{sample.thumbnail}}" data-technology={{sample.technology}}>
  <div class="sample">
    <div class="sample-video"><i class="ms-Icon ms-Icon--VideoSolid" aria-hidden="true"></i></div>
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