import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaTypeEditComponent } from './media-type-edit.component';

describe('MediaTypeEditComponent', () => {
  let component: MediaTypeEditComponent;
  let fixture: ComponentFixture<MediaTypeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaTypeEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
