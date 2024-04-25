import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConfigBusinessRuleComponent } from './admin-config-business-rule.component';

describe('AdminConfigBusinessRuleComponent', () => {
  let component: AdminConfigBusinessRuleComponent;
  let fixture: ComponentFixture<AdminConfigBusinessRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminConfigBusinessRuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminConfigBusinessRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
