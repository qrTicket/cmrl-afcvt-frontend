import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfiguredEquipComponent } from './configured-equip.component';

describe('ConfiguredEquipComponent', () => {
  let component: ConfiguredEquipComponent;
  let fixture: ComponentFixture<ConfiguredEquipComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguredEquipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguredEquipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
