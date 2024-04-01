import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialDaysListComponent } from './special-days-list.component';

describe('SpecialDaysListComponent', () => {
  let component: SpecialDaysListComponent;
  let fixture: ComponentFixture<SpecialDaysListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialDaysListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialDaysListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
