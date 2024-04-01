import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SpecialDayService } from '../_services/special-day.service';

@Component({
  selector: 'app-special-days-list',
  templateUrl: './special-days-list.component.html',
  styleUrls: ['./special-days-list.component.scss']
})
export class SpecialDaysListComponent implements OnInit {
  specialDayList: any[] = [];
  public temp: Object = false;

  constructor(
      private toaster: ToastrService,
      private specialDaySrv: SpecialDayService
      ) {}

  ngOnInit() {
    this.getSpecialDayList();
  }

  getSpecialDayList() {
    this.specialDaySrv.getSpecialDayList().subscribe({
      next:(res)=>{
        if(res.status === "0"){
          this.toaster.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.specialDayList = res.data;
          this.temp = true;
          console.log(this.specialDayList,'this.specialDayList')
        }
      },
      error:(err)=>{
        this.toaster.error(err.error.data,'Error!')
      }
    })    
  }

}
