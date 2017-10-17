import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonviewComponent } from './jsonview.component';

describe('JsonviewComponent', () => {
  let component: JsonviewComponent;
  let fixture: ComponentFixture<JsonviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JsonviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
