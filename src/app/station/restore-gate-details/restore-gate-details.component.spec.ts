import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RestoreGateDetailsComponent } from './restore-gate-details.component';

describe('RestoreGateDetailsComponent', () => {
  let component: RestoreGateDetailsComponent;
  let fixture: ComponentFixture<RestoreGateDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RestoreGateDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoreGateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
