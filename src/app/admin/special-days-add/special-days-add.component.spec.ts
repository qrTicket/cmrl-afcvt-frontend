import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialDaysAddComponent } from './special-days-add.component';

describe('SpecialDaysAddComponent', () => {
  let component: SpecialDaysAddComponent;
  let fixture: ComponentFixture<SpecialDaysAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialDaysAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialDaysAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
