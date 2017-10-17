import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Constant } from '../../utils/constant';

@Component({
  selector: 'stop-monitoring-form',
  templateUrl: './stop-monitoring-form.component.html',
  styleUrls: ['./stop-monitoring-form.component.css']
})
export class StopMonitoringFormComponent implements OnInit {

  @Input()
  private monitoringRefs;
  @Input()
  private lineRefs;

  @Output()
  private submit = new EventEmitter();

  private group: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.group = this.fb.group({
      monitoringRef: ['', []],
      lineRef: [''],
      startTime: ['', Validators.compose([Validators.pattern(Constant.TIME_PATTERN)])],
      stopVisitTypes: [''],
      previewInterval: [''],
      maximumStopVisits: [''],
      minimumStopVisitsPerLine: [''],
      minimumStopVisitsPerLineVia: [''],
      maximumNumberOfCallsPrevious: [''],
      maximumNumberOfCallsOnwards: [''],
    });
  }

  onChange(name, value) {
    // console.log(name + " = " + value);
    let control = this.group.controls[name];
    control.setValue(value);
  }

  onSubmit(value: any) {
    this.submit.emit(value);
  }

}