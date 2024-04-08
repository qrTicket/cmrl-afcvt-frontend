import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminZoneListComponent } from './admin-zone-list.component';

describe('AdminZoneListComponent', () => {
  let component: AdminZoneListComponent;
  let fixture: ComponentFixture<AdminZoneListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminZoneListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminZoneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
