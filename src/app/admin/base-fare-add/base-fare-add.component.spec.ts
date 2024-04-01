import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseFareAddComponent } from './base-fare-add.component';

describe('BaseFareAddComponent', () => {
  let component: BaseFareAddComponent;
  let fixture: ComponentFixture<BaseFareAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseFareAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseFareAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
