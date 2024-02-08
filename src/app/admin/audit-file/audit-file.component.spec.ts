import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AuditFileComponent } from './audit-file.component';

describe('AuditFileComponent', () => {
  let component: AuditFileComponent;
  let fixture: ComponentFixture<AuditFileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
