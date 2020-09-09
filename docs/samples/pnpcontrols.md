# Samples by PnP Controls

Many samples use the [PnP React Reusable Controls for SPFx](https://pnp.github.io/sp-dev-fx-controls-react/) and the [Reusable property pane controls for SPFx](https://pnp.github.io/sp-dev-fx-property-controls/) and demonstrate the many ways that you can use the various controls at your disposal.

 <div class="well">
  <div class="button-group filters-button-group">
    <button class="button is-checked" data-filter="*">All</button>
    <button class="button" data-filter="[data-pnpcontrols*='ChartControl']">ChartControl</button>
    <button class="button" data-filter="[data-pnpcontrols*='FileTypeIcon']">FileTypeIcon</button>
    <button class="button" data-filter="[data-pnpcontrols*='ListView']">ListView</button>
    <button class="button" data-filter="[data-pnpcontrols*='Map']">Map</button>
    <button class="button" data-filter="[data-pnpcontrols*='PeoplePicker']">PeoplePicker</button>
    <button class="button" data-filter="[data-pnpcontrols*='Placeholder']">Placeholder</button>
    <button class="button" data-filter="[data-pnpcontrols*='PropertyFieldCodeEditorLanguages']">PropertyFieldCodeEditorLanguages</button>
    <button class="button" data-filter="[data-pnpcontrols*='PropertyFieldColorPicker']">PropertyFieldColorPicker</button>
    <button class="button" data-filter="[data-pnpcontrols*='PropertyFieldDateTimePicker']">PropertyFieldDateTimePicker</button>
    <button class="button" data-filter="[data-pnpcontrols*='PropertyFieldListPicker']">PropertyFieldListPicker</button>
    <button class="button" data-filter="[data-pnpcontrols*='PropertyFieldNumber']">PropertyFieldNumber</button>
    <button class="button" data-filter="[data-pnpcontrols*='PropertyFieldSliderWithCallout']">PropertyFieldSliderWithCallout</button>
    <button class="button" data-filter="[data-pnpcontrols*='PropertyFieldSpinButton']">PropertyFieldSpinButton</button>
    <button class="button" data-filter="[data-pnpcontrols*='PropertyFieldTermPicker']">PropertyFieldTermPicker</button>
    <button class="button" data-filter="[data-pnpcontrols*='PropertyFieldTextWithCallout']">PropertyFieldTextWithCallout</button>
    <button class="button" data-filter="[data-pnpcontrols*='PropertyFieldToggleWithCallout']">PropertyFieldToggleWithCallout</button>
    <button class="button" data-filter="[data-pnpcontrols*='PropertyFieldViewPicker']">PropertyFieldViewPicker</button>
    <button class="button" data-filter="[data-pnpcontrols*='PropertyPaneWebPartInformation']">PropertyPaneWebPartInformation</button>
    <button class="button" data-filter="[data-pnpcontrols*='WebPartTitle']">WebPartTitle</button>
  </div>
</div>


<div class="grid">

{% for sample in samples|sort(attribute='modified', reverse=True) %}

<div class="sample-item" data-pnpcontrols="{{sample.pnpcontrols}}" data-spfx="{{sample.spfx}}" data-modified="{{sample.modified}}" data-title="{{ sample.title }}"  data-thumbnail="{{sample.thumbnail}}">
  <div class="sample">
    <div class="sample-video"><i class="ms-Icon ms-Icon--VideoSolid" aria-hidden="true"></i></div>
    <div class="sample-img">
      <a class="sample-link"
        href="{{sample.url}}"
        title="{{sample.summary}}">
        <picture>
          <img src="https://pnp.github.io/sp-dev-fx-webparts/img/thumbnails/sm/{{ sample.name }}.png" width="302" alt="{{sample.name}}" data-fullsize="{{sample.thumbnail}}" data-orig="https://pnp.github.io/sp-dev-fx-webparts/img/thumbnails/sm/{{ sample.name }}.png"/>
        </picture>
      </a>
    </div>
  </div>
      <a href="{{sample.url}}"
      title="{{ sample.summary }}">
<span class="location" title="{{sample.pnp}}">{{ sample.pnp }}</span>
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

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/docs/samples/pnpcontrols" />