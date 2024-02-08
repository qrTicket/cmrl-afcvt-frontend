import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StationlinkRuleComponent } from './stationlink-rule.component';

describe('StationlinkRuleComponent', () => {
  let component: StationlinkRuleComponent;
  let fixture: ComponentFixture<StationlinkRuleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StationlinkRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationlinkRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
