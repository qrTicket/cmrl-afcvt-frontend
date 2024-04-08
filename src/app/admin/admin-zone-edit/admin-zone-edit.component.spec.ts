import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminZoneEditComponent } from './admin-zone-edit.component';

describe('AdminZoneEditComponent', () => {
  let component: AdminZoneEditComponent;
  let fixture: ComponentFixture<AdminZoneEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminZoneEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminZoneEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
