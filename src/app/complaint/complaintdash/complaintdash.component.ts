import { Component, OnInit } from '@angular/core';
import { ComplainService } from '../_complainservices/complain.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-complaintdash',
    templateUrl: './complaintdash.component.html',
    styleUrls: ['./complaintdash.component.scss']
})
export class ComplaintdashComponent implements OnInit {

    subscription: Subscription[] = []
    pending: any = [];
    progress: any = [];
    resolve: any = [];
    reject: any = [];
    totalCount: number;
    pendingCount: number =0;
    progressCount: number=0;
    resolvedCount: number=0;
    rejectedCount: number=0;

    constructor(
        private complaintService: ComplainService,
        private toastr:ToastrService
    ) { }

    ngOnInit() {
        this.totalcomplaintlist();
        this.pendinglist();
        this.progressedlist();
        this.resolvedlist();
        //this.rejectedlist();
    }

    totalcomplaintlist() {
        this.subscription.push(
            // this.complaintService.complaintCount().subscribe((res) => {
            //     if(res['status']==="1"){
            //         this.totalCount = res['data'];
            //     }else{
            //         this.totalCount = 0;
            //     }
            // })

            this.complaintService.complaintCount().subscribe({
                next:(res)=>{
                  if(res.status === "0"){
                      this.toastr.error(res.data,'Error!')
                  }
                  else if(res.status === "1"){
                    this.totalCount = res.data;
                  }
                },
                error:(err)=>{
                    this.toastr.error(err.error.data,'Error!')
                }
              })
        );
    }

    pendinglist() {
        this.subscription.push(
            // this.complaintService.pendingComplaintList().subscribe((res) => {
            //     this.pending = res['data'];
            //     if(res['status']==="1"){
            //         this.pendingCount = res["data"].length;
            //     }else{
            //         this.pendingCount = 0;
            //     }
            // })
            this.complaintService.pendingComplaintList().subscribe({
                next:(res)=>{
                  if(res.status === "0"){
                      this.toastr.error(res.data,'Error!')
                  }
                  else if(res.status === "1"){
                    this.pendingCount = res.data.length;
                  }
                },
                error:(err)=>{
                    this.toastr.error(err.error.data,'Error!')
                }
              })
        );
    }

    progressedlist() {
        this.subscription.push(
            // this.complaintService.progressComplaintList().subscribe((res) => {
            //     this.progress = res['data'];
            //     if(res['status']==="1"){
            //         this.progressCount = res["data"].length;
            //     }else{
            //         this.progressCount = 0;
            //     }
            // })
            this.complaintService.progressComplaintList().subscribe({
                next:(res)=>{
                  if(res.status === "0"){
                    this.toastr.error(res.data,'Error!')
                  }
                  else if(res.status === "1"){
                    this.pendingCount = res.data.length;
                  }
                },
                error:(err)=>{
                    this.toastr.error(err.error.data,'Error!')
                }
              })
        );
    }

    resolvedlist() {
        this.subscription.push(
            // this.complaintService.resolvedComplaintList().subscribe((res) => {
            //     this.resolve = res['data'];
                
            //     if(res['status']==="1"){
            //         this.resolvedCount = res["data"].length;
            //     }else{
            //         this.resolvedCount = 0;
            //     }
            // })
            this.complaintService.resolvedComplaintList().subscribe({
                next:(res)=>{
                  if(res.status === "0"){
                    this.toastr.error(res.data,'Error!')
                  }
                  else if(res.status === "1"){
                    this.resolvedCount = res.data.length;
                  }
                },
                error:(err)=>{
                    this.toastr.error(err.error.data,'Error!')
                }
              })
        );
    }

    rejectedlist() {
        this.subscription.push(
            // this.complaintService.rejectedComplaintList().subscribe((res) => {
            //     this.reject = res['data'];
            //     this.rejectedCount = res["data"].length;
            //     if(res['status']==="1"){
            //         this.rejectedCount = res["data"].length;
            //     }else{
            //         this.rejectedCount = 0;
            //     }
            // })
            this.complaintService.resolvedComplaintList().subscribe({
                next:(res)=>{
                  if(res.status === "0"){
                    this.toastr.error(res.data,'Error!')
                    this.rejectedCount = 0;
                  }
                  else if(res.status === "1"){
                    this.reject = res.data;
                    this.rejectedCount = res.data.length;
                  }
                },
                error:(err)=>{
                    this.toastr.error(err.error.data,'Error!')
                }
              })
        );
    }
    
}