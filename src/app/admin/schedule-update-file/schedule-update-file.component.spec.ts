import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScheduleUpdateFileComponent } from './schedule-update-file.component';

describe('ScheduleUpdateFileComponent', () => {
  let component: ScheduleUpdateFileComponent;
  let fixture: ComponentFixture<ScheduleUpdateFileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleUpdateFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleUpdateFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
