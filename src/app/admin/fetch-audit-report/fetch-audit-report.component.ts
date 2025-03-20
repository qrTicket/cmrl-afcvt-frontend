import { Component, OnInit } from '@angular/core';
import { AdmindashboardService } from '../_services/admindashboard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fetch-audit-report',
  templateUrl: './fetch-audit-report.component.html',
  styleUrls: ['./fetch-audit-report.component.scss']
})
export class FetchAuditReportComponent implements OnInit {

  auditFileData: any[] = [];
  public stationData: Object;
  public temp: Object = false;

  constructor(
    private toaster: ToastrService,
    private adminSrv: AdmindashboardService,
  ) { }



  ngOnInit() {
    this.getAuditFile();
  }

  getAuditFile() {
    this.adminSrv.getAuditFile().subscribe({
      next: (res) => {
        if (res.status === "0") {
          this.toaster.error(res.data, 'Error!')
        }
        else if (res.status === "1") {
          this.auditFileData = res.data;
          this.temp = true;
        }
      },
      error: (err) => {
        this.toaster.error(err.error.data, 'Error!')
      }
    })
  }


}
