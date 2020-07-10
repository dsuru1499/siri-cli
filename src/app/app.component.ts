import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { from } from 'rxjs';
import { filter, map, startWith, reduce } from 'rxjs/operators';

import { Constant } from './utils/constant';
import * as reducers from './reducers';
import * as LinesDiscoveryActions from './actions/lines-discovery-actions';
import * as StopPointsDiscoveryActions from './actions/stop-points-discovery-actions';
import * as StopMonitoringActions from './actions/stop-monitoring-actions';
import * as EstimatedTimetableActions from './actions/estimated-timetable-actions';

import { Xml } from './utils/xml';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SIRI Services';

  monitoringRefs: Array<any>;
  lineRefs: Array<any>;

  constructor(private router: Router, private store: Store<reducers.State>) {
    this.store.dispatch(new LinesDiscoveryActions.LoadAction(Constant.URL));
    this.store.dispatch(new StopPointsDiscoveryActions.LoadAction(Constant.URL));
  }

  ngOnInit() {

    // Envelope.Body.LinesDiscoveryResponse.Answer.AnnotatedLineRef
    this.store.pipe(
      select(reducers.ldState),
      filter(state => !reducers.isEmpty(state.response))
    ).subscribe(state => {
      this.lineRefs = [];
      const array: HTMLCollection = state.response.getElementsByTagNameNS(Xml.SIRI_NAMESPACE_URI, 'AnnotatedLineRef');
      for (let i = 0; i < array.length; i++) {
        const value = array.item(i);
        this.lineRefs.push({
          LineRef: value.getElementsByTagNameNS(Xml.SIRI_NAMESPACE_URI, 'LineRef')[0].textContent,
          LineName: value.getElementsByTagNameNS(Xml.SIRI_NAMESPACE_URI, 'LineName')[0].textContent
        });
      }
    });

    // Envelope.Body.StopPointsDiscoveryResponse.Answer.AnnotatedStopPointRef;
    this.store.pipe(
      select(reducers.sdState),
      filter(state => !reducers.isEmpty(state.response))
    ).subscribe(state => {
      this.monitoringRefs = [];
      const array: HTMLCollection = state.response.getElementsByTagNameNS(Xml.SIRI_NAMESPACE_URI, 'AnnotatedStopPointRef');
      for (let i = 0; i < array.length; i++) {
        const value = array.item(i);
        this.monitoringRefs.push({
          StopName: value.getElementsByTagNameNS(Xml.SIRI_NAMESPACE_URI, 'StopName')[0].textContent,
          StopPointRef: value.getElementsByTagNameNS(Xml.SIRI_NAMESPACE_URI, 'StopPointRef')[0].textContent
        });
      }
    });
  }

  onClick(title, path) {
    this.title = title;
    this.router.navigate([path]);
  }

  onStopMonitoringSubmit(event: any) {
    const url = this.getUrl(event);
    this.store.dispatch(new StopMonitoringActions.LoadAction(url));
  }

  onEstimatedTimetableSubmit(event: any) {
    const url = this.getUrl(event);
    this.store.dispatch(new EstimatedTimetableActions.LoadAction(url));
  }

  private getUrl(event: any): string {
    let result: string;
    from(Object.keys(event)).pipe(
      filter(key => event[key]),
      map(key => `&${key}=${event[key]}`),
      startWith(Constant.URL),
      reduce((acc, value) => `${acc}${value}`)
    ).subscribe((value) => result = value);
    return result;
  }
}
