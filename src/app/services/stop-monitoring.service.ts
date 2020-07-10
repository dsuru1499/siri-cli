import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SiriService } from './siri.service';
import { Xml } from '../utils/xml';

@Injectable()
export class StopMonitoringService extends SiriService {

  constructor(http: HttpClient) {
    super(http);
  }

  public getDocument(url: string) {

    const options = this.getOptions(url);
    const now = new Date();
    const doc = Xml.createSoapDocument();
    const body = Xml.createElement(doc.documentElement, 'soap:Body');
    const service = Xml.createElement(body, 'tns:GetStopMonitoring', null,
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

    if (options['monitoringRef']) {
      Xml.createElement(request, 'siri:MonitoringRef', options['monitoringRef']);
    }
    if (options['lineRef']) {
      Xml.createElement(request, 'siri:LineRef', options['lineRef']);
    }
    if (options['startTime']) {
      Xml.createElement(request, 'siri:StartTime', options['startTime']);
    }
    if (options['stopVisitTypes']) {
      Xml.createElement(request, 'siri:StopVisitTypes', options['stopVisitTypes']);
    }
    if (options['previewInterval']) {
      Xml.createElement(request, 'siri:PreviewInterval', 'PT' + options['previewInterval'] + 'M');
    }
    if (options['maximumStopVisits']) {
      Xml.createElement(request, 'siri:MaximumStopVisits', options['maximumStopVisits']);
    }
    if (options['minimumStopVisitsPerLine']) {
      Xml.createElement(request, 'siri:MinimumStopVisitsPerLine', options['minimumStopVisitsPerLine']);
    }
    if (options['minimumStopVisitsPerLineVia']) {
      Xml.createElement(request, 'siri:MinimumStopVisitsPerLineVia', options['minimumStopVisitsPerLineVia']);
    }
    if (options['maximumNumberOfCallsOnwards'] || options['maximumNumberOfCallsPrevious']) {
      const maximumNumberOfCalls = Xml.createElement(request, 'siri:MaximumNumberOfCalls', null);
      if (options['maximumNumberOfCallsOnwards']) {
        Xml.createElement(maximumNumberOfCalls, 'siri:Onwards', options['maximumNumberOfCallsOnwards']);
      }
      if (options['maximumNumberOfCallsPrevious']) {
        Xml.createElement(maximumNumberOfCalls, 'siri:Previous', options['maximumNumberOfCallsPrevious']);
      }
    }
    // Request Extension
    const requestextension = Xml.createElement(service, 'RequestExtension');

    return doc;
  }

}
