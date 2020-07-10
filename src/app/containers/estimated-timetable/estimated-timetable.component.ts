import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as reducers from '../../reducers';
import { State } from '../../reducers/lines-discovery-reducer';

@Component({
  selector: 'app-estimated-timetable',
  templateUrl: './estimated-timetable.component.html',
  styleUrls: ['./estimated-timetable.component.scss']
})
export class EstimatedTimetableComponent {


  state$: Observable<State>;

  constructor(private store: Store<reducers.State>) {
    this.state$ = store.select(reducers.etState);
  }

}
