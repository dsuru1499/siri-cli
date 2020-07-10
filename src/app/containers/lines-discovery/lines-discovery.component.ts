import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Constant } from '../../utils/constant';
import * as reducers from '../../reducers';
import * as LinesDiscoveryActions from '../../actions/lines-discovery-actions';
import { State } from '../../reducers/lines-discovery-reducer';

@Component({
  selector: 'app-lines-discovery',
  templateUrl: './lines-discovery.component.html',
  styleUrls: ['./lines-discovery.component.scss']
})
export class LinesDiscoveryComponent implements OnInit {

  state$: Observable<State>;

  constructor(private store: Store<reducers.State>) {
    this.state$ = store.select(reducers.ldState);
  }

  ngOnInit(): void {
    this.store.dispatch(new LinesDiscoveryActions.LoadAction(Constant.URL));
  }

}
