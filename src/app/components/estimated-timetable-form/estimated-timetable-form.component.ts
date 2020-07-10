import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { filter, take, flatMap, toArray } from 'rxjs/operators';
@Component({
  selector: 'app-estimated-timetable-form',
  templateUrl: './estimated-timetable-form.component.html',
  styleUrls: ['./estimated-timetable-form.component.scss']
})
export class EstimatedTimetableFormComponent implements OnInit {

  @Input()
  lineRefs: object[];
  @Output()
  estimatedTimetableChange = new EventEmitter();

  group: FormGroup;

  filteredLineRefs: Observable<object[]>;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.group = this.fb.group({
      lineRef: ['', [Validators.required]],
      previewInterval: [''],
    });
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
    this.estimatedTimetableChange.emit(value);
  }

  private filter(array: object[], key: string, value: string): Observable<object[]> {
    return from(array).pipe(
      filter(t => t[key].toLowerCase().includes(value.toLowerCase())),
      take(50),
      toArray()
    );
  }
}
