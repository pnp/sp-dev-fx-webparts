import { MSGraphClient } from "@microsoft/sp-client-preview";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';

@Injectable()
export class GraphService {
  public getMe(client: MSGraphClient): Observable<{ displayName: string }> {
    return from(
      client.api("/me").get()
    );
  }
}
