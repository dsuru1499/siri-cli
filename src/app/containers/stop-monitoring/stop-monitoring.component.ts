import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as reducers from '../../reducers';
import { State } from '../../reducers/lines-discovery-reducer';

@Component({
  selector: 'app-stop-monitoring',
  templateUrl: './stop-monitoring.component.html',
  styleUrls: ['./stop-monitoring.component.scss']
})
export class StopMonitoringComponent {

  state$: Observable<State>;

  constructor(private store: Store<reducers.State>) {
    this.state$ = store.select(reducers.smState);
  }

}
