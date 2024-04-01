import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialDaysEditComponent } from './special-days-edit.component';

describe('SpecialDaysEditComponent', () => {
  let component: SpecialDaysEditComponent;
  let fixture: ComponentFixture<SpecialDaysEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialDaysEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialDaysEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
