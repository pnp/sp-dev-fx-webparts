# Samples by Framework

## Filter

<div id="filters" class="button-group">  <button class="button is-checked" data-filter="*">show all</button>
  <button class="button" data-filter=".metal">metal</button>
  <button class="button" data-filter=".transition">transition</button>
  <button class="button" data-filter=".alkali, .alkaline-earth">alkali and alkaline-earth</button>
  <button class="button" data-filter=":not(.transition)">not transition</button>
  <button class="button" data-filter=".metal:not(.transition)">metal but not transition</button>
  <button class="button" data-filter="numberGreaterThan50">number > 50</button>
  <button class="button" data-filter="ium">name ends with &ndash;ium</button>
</div>

## Sort

<div id="sorts" class="button-group">  <button class="button is-checked" data-sort-by="original-order">original order</button>
  <button class="button" data-sort-by="name">name</button>
  <button class="button" data-sort-by="symbol">symbol</button>
  <button class="button" data-sort-by="number">number</button>
  <button class="button" data-sort-by="weight">weight</button>
  <button class="button" data-sort-by="category">category</button>
</div>

## Results
 
<div class="grid">

    {% for element in elements %}
    <div class="element-item {{ element.category }} " data-category="{{ element.datacategory }}">
        <h3 class="name">{{ element.name }}</h3>
        <p class="symbol">{{ element.symbol }}</p>
        <p class="number">{{ element.number }}</p>
        <p class="weight">{{ element.weight }}</p>
    </div>
    {% endfor %}
</div>