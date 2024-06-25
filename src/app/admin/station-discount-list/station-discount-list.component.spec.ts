import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationDiscountListComponent } from './station-discount-list.component';

describe('StationDiscountListComponent', () => {
  let component: StationDiscountListComponent;
  let fixture: ComponentFixture<StationDiscountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationDiscountListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationDiscountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
