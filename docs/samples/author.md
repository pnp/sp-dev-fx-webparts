# Samples by Author

Our samples were created by the feature teams, SharePoint PnP core team (http://aka.ms/SharePointPnP) or shared by the community. Use the filter below to find samples by author.

To learn more about how to use these samples, please refer to our [getting started](../gettingstarted/index.md) section.

<div class="well">

<input list="authors" name="author" class="form-control" placeholder="Type to search by author" id="author" />
<datalist id="authors">
  {% for author in authors %}
    <option value="{{ author }}">
  {% endfor %}
</datalist>

<br/>

<div class="grid">

{% for sample in samples %}

<div class="sample-item" data-author="{{ sample.author }}"  data-thumbnail="{{sample.thumbnail}}">
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

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/docs/samples/author" />