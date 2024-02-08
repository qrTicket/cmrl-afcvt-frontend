import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScheduleFileUpdateListComponent } from './schedule-file-update-list.component';

describe('ScheduleFileUpdateListComponent', () => {
  let component: ScheduleFileUpdateListComponent;
  let fixture: ComponentFixture<ScheduleFileUpdateListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleFileUpdateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleFileUpdateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
