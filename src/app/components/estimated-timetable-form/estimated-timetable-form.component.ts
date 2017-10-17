import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Constant } from '../../utils/constant';

@Component({
  selector: 'estimated-timetable-form',
  templateUrl: './estimated-timetable-form.component.html',
  styleUrls: ['./estimated-timetable-form.component.css']
})
export class EstimatedTimetableFormComponent implements OnInit {

  @Input()
  private lineRefs;

  @Output()
  private submit = new EventEmitter();

  private group: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.group = this.fb.group({
      lineRef: [''],
      previewInterval: [''],
    });
  }

  onChange(name, value) {
    console.log(name + " = " + value);
    let control = this.group.controls[name];
    control.setValue(value);
  }

  onSubmit(value: any) {
    this.submit.emit(value);
  }

}
