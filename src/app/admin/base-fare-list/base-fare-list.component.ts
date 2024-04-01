import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseFareService } from '../_services/base-fare.service';

@Component({
  selector: 'app-base-fare-list',
  templateUrl: './base-fare-list.component.html',
  styleUrls: ['./base-fare-list.component.scss']
})
export class BaseFareListComponent implements OnInit {
  baseFareList: any[] = [];
  public temp: Object = false;

  constructor(
      private toaster: ToastrService,
      private router: Router,
      private baseFareSrv:BaseFareService
      ) {}

  ngOnInit() {
      this.getBaseFareList();
  }

  getBaseFareList() {
    this.baseFareSrv.getBaseFareList().subscribe({
      next:(res)=>{
        if(res.status === "0"){
          this.toaster.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.baseFareList = res.data;
          this.temp = true;
          console.log(this.baseFareList,'this.baseFareList')
        }
      },
      error:(err)=>{
        this.toaster.error(err.error.data,'Error!')
      }
    })    
  }

}
