import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationDiscountAddComponent } from './station-discount-add.component';

describe('StationDiscountAddComponent', () => {
  let component: StationDiscountAddComponent;
  let fixture: ComponentFixture<StationDiscountAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationDiscountAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationDiscountAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
