import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Observer } from 'rxjs/Rx';
import *  as xpath from 'xpath';

import { Constant } from './utils/constant';
import * as reducers from './reducers';
import * as LinesDiscoveryActions from './actions/lines-discovery-actions';
import * as StopPointsDiscoveryActions from './actions/stop-points-discovery-actions';
import * as StopMonitoringActions from './actions/stop-monitoring-actions';
import * as EstimatedTimetableActions from './actions/estimated-timetable-actions';

import { Xml } from './utils/xml';

var document, Node, XPathEvaluator: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  private title: string = 'SIRI Services';

  @ViewChild('panel')
  private panel: ElementRef;

  @ViewChild('collapse')
  private collapse: ElementRef;

  private monitoringRefs: Array<any>;
  private lineRefs: Array<any>;

  constructor(private router: Router, private store: Store<reducers.State>) {
    this.store.dispatch(new LinesDiscoveryActions.LoadAction(Constant.URL));
    this.store.dispatch(new StopPointsDiscoveryActions.LoadAction(Constant.URL));
  }

  ngOnInit() {
    // Envelope.Body.LinesDiscoveryResponse.Answer.AnnotatedLineRef
    this.store.select(reducers.ldState).filter(state => !reducers.isEmpty(state.response))
      .subscribe(state => {
        this.lineRefs = [];
        let array = state.response.getElementsByTagNameNS(Xml.SIRI_NAMESPACE_URI, "AnnotatedLineRef");
        for (var i = 0; i < array.length; i++) {
          var value = array[i];
          this.lineRefs.push({
            LineRef: value.getElementsByTagNameNS(Xml.SIRI_NAMESPACE_URI, "LineRef")[0].textContent,
            LineName: value.getElementsByTagNameNS(Xml.SIRI_NAMESPACE_URI, "LineName")[0].textContent
          });
        }
      });

    // Envelope.Body.StopPointsDiscoveryResponse.Answer.AnnotatedStopPointRef;
    this.store.select(reducers.sdState).filter(state => !reducers.isEmpty(state.response))
      .subscribe(state => {
        this.monitoringRefs = [];
        let array = state.response.getElementsByTagNameNS(Xml.SIRI_NAMESPACE_URI, "AnnotatedStopPointRef");
        for (var i = 0; i < array.length; i++) {
          var value = array[i];
          this.monitoringRefs.push({
            StopName: value.getElementsByTagNameNS(Xml.SIRI_NAMESPACE_URI, "StopName")[0].textContent,
            StopPointRef: value.getElementsByTagNameNS(Xml.SIRI_NAMESPACE_URI, "StopPointRef")[0].textContent
          });
        }
      });
  }



  onClick(title, path) {
    this.title = title;
    this.router.navigate([path]);
  }

  onStopMonitoringSubmit(value: any) {
    // console.log(value);
    let url = this.getUrl(value);
    this.store.dispatch(new StopMonitoringActions.LoadAction(url));
    this.panel.nativeElement.closeDrawer();
  }

  onEstimatedTimetableSubmit(value: any) {
    // console.log(value);
    let url = this.getUrl(value);
    this.store.dispatch(new EstimatedTimetableActions.LoadAction(url));
    this.panel.nativeElement.closeDrawer();
  }

  private getUrl(value: any): string {
    let result: string;
    Observable.from(Object.keys(value))
      .filter(key => value[key])
      .map(key => `&${key}=${value[key]}`)
      .startWith(Constant.URL)
      .reduce((acc, value) => `${acc}${value}`)
      .subscribe((value) => result = value);
    return result;
  }
}
