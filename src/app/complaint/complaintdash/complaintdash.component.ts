import { Component, OnInit } from '@angular/core';
import { ComplainService } from '../_complainservices/complain.service';
import { Subscription } from 'rxjs';

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
    pendingCount: number;
    progressCount: number;
    resolvedCount: number;
    rejectedCount: number;

    constructor(
        private complaintService: ComplainService,
    ) { }

    ngOnInit() {
        this.totalcomplaintlist();
        this.pendinglist();
        this.progressedlist();
        this.resolvedlist();
        this.rejectedlist();
    }

    totalcomplaintlist() {
        this.subscription.push(
            this.complaintService.complaintCount().subscribe((res) => {
                if(res['status']==="1"){
                    this.totalCount = res['data'];
                }else{
                    this.totalCount = 0;
                }
                
            })
        );
    }

    pendinglist() {
        this.subscription.push(
            this.complaintService.pendingComplaintList().subscribe((res) => {
                this.pending = res['data'];
                if(res['status']==="1"){
                    this.pendingCount = res["data"].length;
                }else{
                    this.pendingCount = 0;
                }
            })
        );
    }

    progressedlist() {
        this.subscription.push(
            this.complaintService.progressComplaintList().subscribe((res) => {
                this.progress = res['data'];
                if(res['status']==="1"){
                    this.progressCount = res["data"].length;
                }else{
                    this.progressCount = 0;
                }
            })
        );
    }

    resolvedlist() {
        this.subscription.push(
            this.complaintService.resolvedComplaintList().subscribe((res) => {
                this.resolve = res['data'];
                
                if(res['status']==="1"){
                    this.resolvedCount = res["data"].length;
                }else{
                    this.resolvedCount = 0;
                }
            })
        );
    }

    rejectedlist() {
        this.subscription.push(
            this.complaintService.rejectedComplaintList().subscribe((res) => {
                this.reject = res['data'];
                this.rejectedCount = res["data"].length;
                if(res['status']==="1"){
                    this.rejectedCount = res["data"].length;
                }else{
                    this.rejectedCount = 0;
                }
            })
        );
    }
    
}