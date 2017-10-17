import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import * as reducers from '../../reducers';

@Component({
  selector: 'app-stop-monitoring',
  templateUrl: './stop-monitoring.component.html',
  styleUrls: ['./stop-monitoring.component.css']
})
export class StopMonitoringComponent {

  private state$: Observable<any>;

  constructor(private store: Store<reducers.State>) {
    this.state$ = store.select(reducers.smState);
  }

}
