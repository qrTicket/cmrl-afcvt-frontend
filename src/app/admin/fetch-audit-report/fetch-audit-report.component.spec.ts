import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchAuditReportComponent } from './fetch-audit-report.component';

describe('FetchAuditReportComponent', () => {
  let component: FetchAuditReportComponent;
  let fixture: ComponentFixture<FetchAuditReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FetchAuditReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetchAuditReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
