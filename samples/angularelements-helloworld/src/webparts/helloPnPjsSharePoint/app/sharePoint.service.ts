import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { sp } from "@pnp/sp";

@Injectable()
export class SharePointService {
  public getSiteTitle(): Observable<{ Title: string }> {
    return from(
      sp.web.get()
    );
  }
}
