import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewGateDetailsByNameComponent } from './view-gate-details-by-name.component';

describe('ViewGateDetailsByNameComponent', () => {
  let component: ViewGateDetailsByNameComponent;
  let fixture: ComponentFixture<ViewGateDetailsByNameComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGateDetailsByNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGateDetailsByNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
