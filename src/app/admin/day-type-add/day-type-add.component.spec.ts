import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayTypeAddComponent } from './day-type-add.component';

describe('DayTypeAddComponent', () => {
  let component: DayTypeAddComponent;
  let fixture: ComponentFixture<DayTypeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayTypeAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
