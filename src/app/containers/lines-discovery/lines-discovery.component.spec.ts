import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinesDiscoveryComponent } from './lines-discovery.component';

describe('LinesDiscoveryComponent', () => {
  let component: LinesDiscoveryComponent;
  let fixture: ComponentFixture<LinesDiscoveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinesDiscoveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinesDiscoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
