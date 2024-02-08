import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CentralAlarmsComponent } from './central-alarms.component';

describe('CentralAlarmsComponent', () => {
  let component: CentralAlarmsComponent;
  let fixture: ComponentFixture<CentralAlarmsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CentralAlarmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentralAlarmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
