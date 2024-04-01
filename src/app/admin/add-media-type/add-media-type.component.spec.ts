import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMediaTypeComponent } from './add-media-type.component';

describe('AddMediaTypeComponent', () => {
  let component: AddMediaTypeComponent;
  let fixture: ComponentFixture<AddMediaTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMediaTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMediaTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
