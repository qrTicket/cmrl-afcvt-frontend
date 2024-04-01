import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayTimeSlotMapUpdateComponent } from './day-time-slot-map-update.component';

describe('DayTimeSlotMapUpdateComponent', () => {
  let component: DayTimeSlotMapUpdateComponent;
  let fixture: ComponentFixture<DayTimeSlotMapUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayTimeSlotMapUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayTimeSlotMapUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
