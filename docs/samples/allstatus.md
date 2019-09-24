# Samples with Status

<table id="samplestable" >
    <thead>
        <tr>
            <th>Title</th>
            <th>Written by</th>
            <th>SPFx</th>
            <th>Framework</th>
            <th>Modified</th>
            <th>Status</th>
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
        <td>{{ sample.modifiedtext }}</td>
        <td><span title="{{ sample.statusmessage }}">{{ sample.status }}</span></td>
    </tr>
    {% endfor %}
    </tbody>
</table>

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/docs/samples/allstatus" />