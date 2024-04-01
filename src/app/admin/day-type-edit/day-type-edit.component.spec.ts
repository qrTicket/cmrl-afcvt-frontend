import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayTypeEditComponent } from './day-type-edit.component';

describe('DayTypeEditComponent', () => {
  let component: DayTypeEditComponent;
  let fixture: ComponentFixture<DayTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayTypeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
