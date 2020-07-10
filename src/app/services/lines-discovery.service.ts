import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SiriService } from './siri.service';
import { Xml } from '../utils/xml';

@Injectable()
export class LineDiscoveryService extends SiriService {

  constructor(http: HttpClient) {
    super(http);
  }

  public getDocument(url: string) {
    const options = this.getOptions(url);
    const now = new Date();
    const doc = Xml.createSoapDocument();
    const body = Xml.createElement(doc.documentElement, 'soap:Body');

    const service = Xml.createElement(body, 'tns:LinesDiscovery', null, {
      'xmlns:siri': Xml.SIRI_NAMESPACE_URI,
      'xmlns:acsb': Xml.ACSB_NAMESPACE_URI,
      'xmlns:ifopt': Xml.IFOPT_NAMESPACE_URI,
      'xmlns:datex': Xml.DATEX_NAMESPACE_URI,
      'xmlns:tns': Xml.TNS_NAMESPACE_URI
    });

    const request = Xml.createElement(service, 'Request', null, {
      // tslint:disable-next-line: no-string-literal
      version: options['version']
    });
    Xml.createElement(request, 'siri:RequestTimestamp', now.toISOString());
    Xml.createElement(request, 'siri:RequestorRef', options['requestorRef']);
    Xml.createElement(request, 'siri:MessageIdentifier', now.getTime());

    const requestextension = Xml.createElement(service, 'RequestExtension');

    return doc;
  }
}
