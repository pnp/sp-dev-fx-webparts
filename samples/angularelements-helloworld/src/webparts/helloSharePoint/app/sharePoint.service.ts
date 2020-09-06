import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SharePointService {
  constructor(private http: HttpClient) { }

  public getSiteTitle(siteUrl: string): Observable<{ Title: string }> {
    return this.http.get<{ Title: string }>(`${siteUrl}/_api/web?$select=Title`, {
      headers: new HttpHeaders({
        accept: 'application/json;odata=nometadata'
      })
    });
  }
}