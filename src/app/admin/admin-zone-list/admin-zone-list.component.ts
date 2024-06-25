import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ZoneService } from '../_services/zone.service';
import { AdmindashboardService } from '../_services/admindashboard.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-admin-zone-list',
  templateUrl: './admin-zone-list.component.html',
  styleUrls: ['./admin-zone-list.component.scss']
})
export class AdminZoneListComponent implements OnInit {
  @ViewChild('fileExtn') fileExtn:ElementRef<any>;

  zoneList: any[] = [];
  public temp: Object = false;
  fileExtension:any[];

  constructor(
      private toaster: ToastrService,
      private router: Router,
      private zoneService: ZoneService,
      private admSrv:AdmindashboardService
      ) {}

  ngOnInit() {
      this.getAllZone();
      this.getFileExtensionList();
  }

  getAllZone() {
    this.zoneService.getAllZone().subscribe({
      next:(res)=>{
        if(res.status === "0"){
          this.toaster.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.zoneList = res.data;
          this.temp = true;
          console.log(this.zoneList,'zoneList')
        }
      },
      error:(err)=>{
        this.toaster.error(err.error.data)
      }
    })    
  }

  // get file extension for custom filter
  getFileExtensionList(){
    this.admSrv.getFileExtensionForZones().subscribe({
      next:(resp:any)=>{
        if(resp["status"] === "1"){
          this.fileExtension = resp.data;
          console.log(this.fileExtension);
        }
      },
      error:(err:any)=>{
        this.toaster.error(err.error.data,'ERROR')
      }
    })
  }

  onFileExtensionChange(e:any){
    let fileExt = e.target.value;

    this.admSrv.downloadFileForZone(fileExt).subscribe({
      next:(resp:any)=>{
        const blob = new Blob([resp], {type:'*/*'});
        saveAs(blob,`Zones.${fileExt}`);
        this.fileExtn.nativeElement.value = "";
      },
      error:(err:any)=>{
        this.toaster.error(err.error.data,'ERROR')
      }
    })
  }

}
