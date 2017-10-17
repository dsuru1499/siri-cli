import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import { Constant } from '../../utils/constant';
import * as reducers from '../../reducers';
import * as LinesDiscoveryActions from '../../actions/lines-discovery-actions';

@Component({
  selector: 'app-lines-discovery',
  templateUrl: './lines-discovery.component.html',
  styleUrls: ['./lines-discovery.component.css']
})

export class LinesDiscoveryComponent implements OnInit {

  private state$: Observable<any>;

  constructor(private store: Store<reducers.State>) {
    this.state$ = store.select(reducers.ldState);
  }

  ngOnInit() {
    this.store.dispatch(new LinesDiscoveryActions.LoadAction(Constant.URL));
  }
}
