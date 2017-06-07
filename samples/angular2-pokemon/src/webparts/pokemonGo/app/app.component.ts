import { Component } from "@angular/core";
 import { PokedexService } from "./pokedex.service";
import { Pokemon } from "./pokemon";
import { Inject } from "@angular/core";


@Component({
  selector: "app-root",
  template: require("./app.component.html"),
  styles: [ `
  .pokedex {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.pokedex-pokemon {
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border-radius: 2px;
}

.pokedex-pokemon-id {
  text-align: center;
  font-size: 24px;
}

.pokedex-pokemon-sprite {
  width: 96px;
  height: 96px;
  transition: opacity 0.2s linear;
  opacity: 1;
}

.pokedex-pokemon-sprite.hidden {
  opacity: 0;
}

.pokedex-pokemon-name {
  text-align: center;
}

.load-button {
  display: block;
  margin: 20px auto;
  border: 0;
  border-radius: 2px;
  background-color: rgb(0, 0, 128);
  color: rgb(255, 255, 255);
  max-width: 200px;
  padding: 10px 50px;
  font-size: 20px;
}

.load-button[disabled] {
  opacity: 0.6;
}
  `]
})
export class AppComponent {
  pokemon: Pokemon[] = [];
  isLoading: boolean = false;
  error: boolean = false;


  constructor( @Inject(PokedexService) private pokedexService: PokedexService) {

  }

  ngOnInit() {
    this.loadMore();
  }

  loadMore() {
    this.isLoading = true;
    this.pokedexService.getPokemon(this.pokemon.length, 9)
      .then(pokemon => {
        pokemon = pokemon.map(p => {
          p.imageLoaded = false;
          return p;
        });
        this.pokemon = this.pokemon.concat(pokemon);
        this.isLoading = false;
        this.error = false;
      })
      .catch(() => {
        this.error = true;
        this.isLoading = false;
      });
  }
}