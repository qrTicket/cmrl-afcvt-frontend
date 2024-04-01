import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTableAddComponent } from './time-table-add.component';

describe('TimeTableAddComponent', () => {
  let component: TimeTableAddComponent;
  let fixture: ComponentFixture<TimeTableAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeTableAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeTableAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
