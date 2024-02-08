import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EquipFooterComponent } from './equip-footer.component';

describe('EquipFooterComponent', () => {
  let component: EquipFooterComponent;
  let fixture: ComponentFixture<EquipFooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
