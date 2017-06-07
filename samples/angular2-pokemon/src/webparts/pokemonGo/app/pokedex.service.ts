import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/toPromise";
import {IPokedexService} from  "./ipokedexservice";

@Injectable()
export class PokedexService implements IPokedexService {
  private baseUrl: string = "https://pokeapi.co/api/v2/pokemon/";
  private baseSpriteUrl: string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

  constructor(@Inject(Http) private http: Http) {   }

  getPokemon(offset: number, limit: number) {
    return this.http.get(`${this.baseUrl}?offset=${offset}&limit=${limit}`)
      .toPromise()
      .then(response => response.json().results)
      .then(items => items.map((item, idx) => {
        const id: number = idx + offset + 1;
        return {
          name: item.name,
          sprite: `${this.baseSpriteUrl}${id}.png`,
          id
        };
      }));
  }
}