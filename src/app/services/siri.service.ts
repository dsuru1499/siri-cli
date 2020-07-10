import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Xml } from '../utils/xml';
import { isDevMode } from '@angular/core';

declare var document: any;

export abstract class SiriService {

  constructor(private http: HttpClient) { }

  public get(url: string): Observable<Response> {
    const doc = this.getDocument(url);
    const body = Xml.toString(doc);
    url = (url.indexOf('?') > 0) ? url.slice(0, url.indexOf('?')) : url;
    const headers = new HttpHeaders({
      'Content-Type': 'text/xml'
    });

    url = (isDevMode()) ? 'http://localhost:8080' + url : url;
    return this.http.post(url, body, { headers, responseType: 'text' }).pipe(
      map(response => Xml.fromString(response)),
      catchError(this.onError)
    );
  }

  protected onError(error: any) {
    console.log(error);
    return throwError('failure');
  }

  protected getOptions(url) {
    const parser = document.createElement('a');
    parser.href = url;

    const options = {};

    const queries: string = parser.search.replace(/^\?/, '').split('&');
    for (const query of queries) {
      const split = query.split('=');
      options[split[0]] = split[1];
    }

    const result = {
      protocol: parser.protocol,
      host: parser.host,
      hostname: parser.hostname,
      port: parser.port,
      pathname: parser.pathname,
      search: parser.search,
      options,
      hash: parser.hash,
    };

    return result.options;
  }

  public abstract getDocument(url: string);
}
