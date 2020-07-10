import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Constant } from '../../utils/constant';
import * as reducers from '../../reducers';
import * as StopPointsDiscoveryActions from '../../actions/stop-points-discovery-actions';
import { State } from '../../reducers/lines-discovery-reducer';

@Component({
  selector: 'app-stop-points-discovery',
  templateUrl: './stop-points-discovery.component.html',
  styleUrls: ['./stop-points-discovery.component.scss']
})
export class StopPointsDiscoveryComponent implements OnInit {

  state$: Observable<State>;

  constructor(private store: Store<reducers.State>) {
    this.state$ = store.select(reducers.sdState);
  }

  ngOnInit() {
    this.store.dispatch(new StopPointsDiscoveryActions.LoadAction(Constant.URL));
  }

}