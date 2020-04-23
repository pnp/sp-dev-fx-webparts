import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { graph } from "@pnp/graph";

@Injectable()
export class GraphService {
  public getMe(): Observable<{ displayName: string }> {
    return from(
      graph.me.get()
    );
  }
}
