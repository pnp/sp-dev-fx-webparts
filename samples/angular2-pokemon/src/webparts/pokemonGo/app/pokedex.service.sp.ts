// import { Injectable, Inject } from "@angular/core";
// import { Http } from "@angular/http";
// import "rxjs/add/operator/toPromise";
// import {IPokedexService} from  "./ipokedexservice";
// import {


//   IWebPartContext

// } from '@microsoft/sp-client-preview';

// @Injectable()
// export class PokedexServiceSP implements IPokedexService {
//     private baseSpriteUrl: string = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

//   constructor(@Inject(Http) private http: Http, private context: IWebPartContext) {

//    }

//   getPokemon(offset: number, limit: number): Promise<any> {
//     return this.context.httpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/pokemon/items`)
//       .then(response => response.json())
//       .then(items => items.map((item, idx) => {
//         const id: number = idx + offset + 1;
//         return {
//           name: item.Title,
//           sprite: `${this.baseSpriteUrl}${id}.png`,
//           id
//         };
//       })) as Promise<any>;
//   }
// }

