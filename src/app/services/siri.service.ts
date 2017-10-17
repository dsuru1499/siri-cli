import { Http, Headers, Response } from '@angular/http';
import { Observable } from "rxjs/Rx"
import { Xml } from '../utils/xml';

declare var document: any;

export abstract class SiriService {

  constructor(private http: Http) { }

  public get(url: string): Observable<Response> {
    let doc = this.getDocument(url);
    let body = Xml.toString(doc);
    url = url.slice(0, url.indexOf('?'));
    let headers = new Headers({
      'Content-Type': 'text/xml'
    });

    return this.http.post(url, body, { headers: headers })
      .map(response => Xml.fromString(response.text()))
      .catch(this.onError);
  }

  protected onError(error: any) {
    console.log(error);
    return Observable.throw('failure');
  }

  protected getOptions(url) {
    var parser = document.createElement('a'),
      options = {},
      queries, split, i;
    parser.href = url;
    queries = parser.search.replace(/^\?/, '').split('&');
    for (i = 0; i < queries.length; i++) {
      split = queries[i].split('=');
      options[split[0]] = split[1];
    }
    var result = {
      protocol: parser.protocol,
      host: parser.host,
      hostname: parser.hostname,
      port: parser.port,
      pathname: parser.pathname,
      search: parser.search,
      options: options,
      hash: parser.hash,
    };

    return result.options;
  }

  public abstract getDocument(url: string);
}
