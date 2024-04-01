import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseFareEditComponent } from './base-fare-edit.component';

describe('BaseFareEditComponent', () => {
  let component: BaseFareEditComponent;
  let fixture: ComponentFixture<BaseFareEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseFareEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseFareEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
