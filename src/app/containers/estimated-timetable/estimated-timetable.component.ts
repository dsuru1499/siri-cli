import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';

import * as reducers from '../../reducers';

@Component({
  selector: 'app-estimated-timetable',
  templateUrl: './estimated-timetable.component.html',
  styleUrls: ['./estimated-timetable.component.css']
})
export class EstimatedTimetableComponent implements OnInit {


  private state$: Observable<any>;

  constructor(private store: Store<reducers.State>) {
    this.state$ = store.select(reducers.etState);
  }

  ngOnInit() {
  }
}
