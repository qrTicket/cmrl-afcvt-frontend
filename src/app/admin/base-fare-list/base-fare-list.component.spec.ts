import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseFareListComponent } from './base-fare-list.component';

describe('BaseFareListComponent', () => {
  let component: BaseFareListComponent;
  let fixture: ComponentFixture<BaseFareListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseFareListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseFareListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
