import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ZoneService } from '../_services/zone.service';

@Component({
  selector: 'app-admin-zone-list',
  templateUrl: './admin-zone-list.component.html',
  styleUrls: ['./admin-zone-list.component.scss']
})
export class AdminZoneListComponent implements OnInit {

  zoneList: any[] = [];
  public temp: Object = false;

  constructor(
      private toaster: ToastrService,
      private router: Router,
      private zoneService: ZoneService,
      ) {}

  ngOnInit() {
      this.getAllZone();
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

}
