import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminZoneAddComponent } from './admin-zone-add.component';

describe('AdminZoneAddComponent', () => {
  let component: AdminZoneAddComponent;
  let fixture: ComponentFixture<AdminZoneAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminZoneAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminZoneAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
