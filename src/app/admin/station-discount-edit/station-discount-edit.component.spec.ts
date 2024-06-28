import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationDiscountEditComponent } from './station-discount-edit.component';

describe('StationDiscountEditComponent', () => {
  let component: StationDiscountEditComponent;
  let fixture: ComponentFixture<StationDiscountEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationDiscountEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationDiscountEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
