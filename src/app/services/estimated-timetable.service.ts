import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SiriService } from './siri.service';
import { Xml } from '../utils/xml';

@Injectable()
export class EstimatedTimetableService extends SiriService {

  constructor(http: HttpClient) {
    super(http);
  }

  public getDocument(url: string) {

    const options = this.getOptions(url);
    const now = new Date();
    const doc = Xml.createSoapDocument();
    const body = Xml.createElement(doc.documentElement, 'soap:Body');
    const service = Xml.createElement(body, 'tns:GetEstimatedTimetable', null,
      {
        'xmlns:siri': Xml.SIRI_NAMESPACE_URI,
        'xmlns:acsb': Xml.ACSB_NAMESPACE_URI,
        'xmlns:ifopt': Xml.IFOPT_NAMESPACE_URI,
        'xmlns:datex': Xml.DATEX_NAMESPACE_URI,
        'xmlns:tns': Xml.TNS_NAMESPACE_URI
      });

    // RequestInfo
    const serviceRequestInfo = Xml.createElement(service, 'ServiceRequestInfo');
    Xml.createElement(serviceRequestInfo, 'siri:RequestTimestamp', now.toISOString());
    if (options['requestorRef']) {
      const requestorRef = Xml.createElement(serviceRequestInfo, 'siri:RequestorRef', options['requestorRef']);
    }
    const messageIdentifier = (options['messageIdentifier']) ? options['messageIdentifier'] : now.getTime();
    Xml.createElement(serviceRequestInfo, 'siri:MessageIdentifier', messageIdentifier);

    // Request
    const request = Xml.createElement(service, 'Request', null, { version: options['version'] });
    Xml.createElement(request, 'siri:RequestTimestamp', now.toISOString());
    Xml.createElement(request, 'siri:MessageIdentifier', messageIdentifier);

    if (options['lineRef']) {
      const lines = Xml.createElement(request, 'Lines');
      const lineDirection = Xml.createElement(lines, 'LineDirection');
      Xml.createElement(lineDirection, 'siri:LineRef', options['lineRef']);
    }

    if (options['previewInterval']) {
      Xml.createElement(request, 'siri:PreviewInterval', 'PT' + options['previewInterval'] + 'M');
    }

    // Request Extension
    const requestextension = Xml.createElement(service, 'RequestExtension');

    return doc;
  }

}
