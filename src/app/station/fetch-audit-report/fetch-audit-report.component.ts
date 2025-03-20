import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StationService } from '../_services/station.service';

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
    private stationSrv: StationService,
  ) { }

  ngOnInit() {
    this.getAuditFile();
  }

  getAuditFile() {
    this.stationSrv.getAuditFile().subscribe({
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
