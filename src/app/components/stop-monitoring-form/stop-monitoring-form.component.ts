import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { filter, take, flatMap, toArray } from 'rxjs/operators';
import { Constant } from '../../utils/constant';

@Component({
  selector: 'app-stop-monitoring-form',
  templateUrl: './stop-monitoring-form.component.html',
  styleUrls: ['./stop-monitoring-form.component.scss']
})
export class StopMonitoringFormComponent implements OnInit {

  @Input()
  monitoringRefs: object[];;
  @Input()
  lineRefs: object[];;
  @Output()
  stopMonitoringChange = new EventEmitter();

  group: FormGroup;

  filteredMonitoringRefs: Observable<object[]>;

  filteredLineRefs: Observable<object[]>;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.group = this.fb.group({
      monitoringRef: ['', [Validators.required]],
      lineRef: [''],
      startTime: ['', Validators.compose([Validators.pattern(Constant.TIME_PATTERN)])],
      stopVisitTypes: [''],
      previewInterval: [''],
      maximumStopVisits: [''],
      minimumStopVisitsPerLine: [''],
      minimumStopVisitsPerLineVia: [''],
      maximumNumberOfCallsPrevious: ['0'],
      maximumNumberOfCallsOnwards: ['0'],
    });

    this.filteredMonitoringRefs = this.group.get('monitoringRef').valueChanges
      .pipe(
        flatMap(value => this.filter(this.monitoringRefs, 'StopName', value))
      );

    this.filteredLineRefs = this.group.get('lineRef').valueChanges
      .pipe(
        flatMap(value => this.filter(this.lineRefs, 'LineName', value))
      );
  }

  onChange(name, value) {
    const control = this.group.controls[name];
    control.setValue(value);
  }

  onSubmit(value: any) {
    this.stopMonitoringChange.emit(value);
  }

  private filter(array: object[], key: string, value: string): Observable<object[]> {
    return from(array).pipe(
      filter(t => t[key].toLowerCase().includes(value.toLowerCase())),
      take(50),
      toArray()
    );
  }
}
