import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTableEditComponent } from './time-table-edit.component';

describe('TimeTableEditComponent', () => {
  let component: TimeTableEditComponent;
  let fixture: ComponentFixture<TimeTableEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeTableEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeTableEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
