import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfigurationEquipmentComponent } from './configuration-equipment.component';

describe('ConfigurationEquipmentComponent', () => {
  let component: ConfigurationEquipmentComponent;
  let fixture: ComponentFixture<ConfigurationEquipmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationEquipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
