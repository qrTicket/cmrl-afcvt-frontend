import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { ComplainService } from 'src/app/complaint/_complainservices/complain.service';
import Swal from 'sweetalert2';
import { MainService } from '../_mainservices/main.service';

@Component({
  selector: 'app-inprogress-list',
  templateUrl: './inprogress-list.component.html',
  styleUrls: ['./inprogress-list.component.scss']
})
export class InprogressListComponent implements OnInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  inprogresslist: any;
  successmsg;
  errormsg;
  subscriptions: Subscription[] = [];
  assignForm: FormGroup;
  modalRef: BsModalRef;
  config = {
    animated: true,
    backdrop: true,
    ignoreBackdropClick: false,
  };
  subscription: Subscription[] = [];
  complaintStatusList:any[]=[];
  submitted: boolean;
  

  constructor(
    private mainservice: MainService,
    private modalService: BsModalService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private complainservice: ComplainService,
  ) { }

  dtOptions: DataTables.Settings = {};

  ngOnInit() {
    this.assignForm = this.formBuilder.group({
      token: ["", Validators.required],
      statusCode: ["", Validators.required],
      description: ["", Validators.required]
    });
    this.inprogressComplaintList();
     //get complaint status list
    //  this.complainservice.getComplaintStatusList().subscribe(
    //   (res) => {
    //     this.complaintStatusList=res;
    //   }
    // )
    this.complainservice.getComplaintStatusList().subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.complaintStatusList = res.data;
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
    })
     
  }

  // openAssignModel(assignTemplate: TemplateRef<any>, list) {
  //   this.modalRef = this.modalService.show(assignTemplate, this.config);
  // }
  openAssignModel(assignTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(assignTemplate, this.config);
  }

  inprogressComplaintList() {
    // this.mainservice.inprogressComplaintList().subscribe((res) => {
    //   this.inprogresslist = res['data'];
    // });
    this.mainservice.inprogressComplaintList().subscribe({
      next:(res)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.inprogresslist = res.data;
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
    })
  }

  get fval() {
    return this.assignForm.controls;
  }

  onSubmit() {
    console.log(this.assignForm.value);

    this.submitted = true;
    if(this.assignForm.invalid){
        return Swal.fire({
            icon:"error",
            text:"Please enter all fields!"
        })
    }

    this.subscription.push(
      // this.mainservice.closeComplaint(this.assignForm.value).subscribe(
      //     (res) => {
      //       console.log(res);
      //       this.successmsg = res;
      //       this.toastr.success("", this.successmsg.data);
      //       this.assignForm.reset();
      //       this.modalRef.hide();
      //       this.router.navigate(["/completedComplaintList",]);
      //     },
      //     (error) => {
      //       console.log(error);
      //       this.errormsg = error;
      //       this.toastr.error("", this.errormsg);
      //     }
      //   )
        this.mainservice.closeComplaint(this.assignForm.value).subscribe({
          next:(res:any)=>{
            if(res.status === "0"){
              this.toastr.error(res.data,'Error!')
            }
            else if(res.status === "1"){
              console.log(res);
              this.successmsg = res.data;
              this.toastr.success("", this.successmsg);
              this.assignForm.reset();
              this.modalRef.hide();
              this.router.navigate(["/completedComplaintList",]);
            }
          },
          error:(err)=>{
            //this.toastr.error(err.error.data,'Error!')
            console.log(err.error.data);
            this.errormsg = err.error.data;
            this.toastr.error("", this.errormsg);
          }
        })
    );
  }

  ngOnDestroy() {
    this.subscription.forEach((subs) => subs.unsubscribe());
  }

}
