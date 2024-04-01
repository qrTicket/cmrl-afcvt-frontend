import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayTimeSlotMapComponent } from './day-time-slot-map.component';

describe('DayTimeSlotMapComponent', () => {
  let component: DayTimeSlotMapComponent;
  let fixture: ComponentFixture<DayTimeSlotMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayTimeSlotMapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayTimeSlotMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
