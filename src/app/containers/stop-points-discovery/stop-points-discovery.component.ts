import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import { Constant } from '../../utils/constant';
import * as reducers from '../../reducers';
import * as StopPointsDiscoveryActions from '../../actions/stop-points-discovery-actions';

@Component({
  selector: 'app-stop-points-discovery',
  templateUrl: './stop-points-discovery.component.html',
  styleUrls: ['./stop-points-discovery.component.css']
})
export class StopPointsDiscoveryComponent implements OnInit {

  private state$: Observable<any>;

  constructor(private store: Store<reducers.State>) {
    this.state$ = store.select(reducers.sdState);
  }

  ngOnInit() {
    this.store.dispatch(new StopPointsDiscoveryActions.LoadAction(Constant.URL));
  }

}
