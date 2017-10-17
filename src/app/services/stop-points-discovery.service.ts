import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { SiriService } from './siri.service';
import { Xml } from '../utils/xml';

@Injectable()
export class StopPointsDiscoveryService extends SiriService {

  constructor(http: Http) {
    super(http);
  }

  public getDocument(url: string) {

    var options = this.getOptions(url);
    var now = new Date();
    var doc = Xml.createSoapDocument();
    var body = Xml.createElement(doc.documentElement, 'soap:Body');

    var service = Xml.createElement(body, 'tns:StopPointsDiscovery', null,
      {
        "xmlns:siri": Xml.SIRI_NAMESPACE_URI,
        "xmlns:acsb": Xml.ACSB_NAMESPACE_URI,
        "xmlns:ifopt": Xml.IFOPT_NAMESPACE_URI,
        "xmlns:datex": Xml.DATEX_NAMESPACE_URI,
        "xmlns:tns": Xml.TNS_NAMESPACE_URI
      });

    var request = Xml.createElement(service, 'Request', null, {
      "version": options['version']
    });
    Xml.createElement(request, 'siri:RequestTimestamp', now.toISOString());
    Xml.createElement(request, 'siri:RequestorRef', options['requestorRef']);
    Xml.createElement(request, 'siri:MessageIdentifier', now.getTime());

    var requestextension = Xml.createElement(service, 'RequestExtension');
    return doc;
  }
}
