# All Samples

<table id="samplestable">
    <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>SPFx</th>
            <th>Framework</th>
            <!-- <th>Modified</th> -->
            <th>Preview</th>
        </tr>
    </thead>
<tbody>
    {% for sample in samples %}
    <tr>
        <td><a href="{{ sample.url }}" target="_blank" title="{{sample.summary}}">{{ sample.title }}</a></td>
        <td>{{ sample.author }}</td>
        <td>
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
        {% else %}
            <img src="https://img.shields.io/badge/drop-{{ sample.spfx }}-green.svg" alt="{{ sample.spfx }}"/>
        {% endif %}
        <td>{{ sample.framework }}</td>
        <!-- <td>{{ sample.modifiedtext }}</td> -->
        <td><div class="sample-img">
      <a class="sample-link"
        href="{{sample.url}}"
        title="{{sample.title}}">
        <picture>
          <img src="../../img/thumbnails/sm/{{ sample.name }}.png" width="302" alt="{{sample.name}}" data-fullsize="{{sample.thumbnail}}" data-orig="../../img/thumbnails/sm/{{ sample.name }}.png"/>
        </picture>
      </a>
    </div></td>
    </tr>
    {% endfor %}
    </tbody>
</table>

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/docs/samples/all" />