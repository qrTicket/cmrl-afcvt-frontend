import {
  Component, OnInit, ViewChild, TemplateRef
} from '@angular/core';
import 'rxjs/Rx';
import { ComplainService } from '../_complainservices/complain.service';
import { DataTableDirective } from 'angular-datatables';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pending-list',
  templateUrl: './pending-list.component.html',
  styleUrls: ['./pending-list.component.scss']
})
export class PendingListComponent implements OnInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  complains: any;
  deviceDetails: any;
  public complainlistData: Object;
  subscriptions: Subscription[] = [];
  successmsg: any;
  errormsg: any;


  assignForm: UntypedFormGroup;
  rejectForm: UntypedFormGroup;
  modalRef: BsModalRef;
  config = {
    animated: true,
    backdrop: true,
    ignoreBackdropClick: false,
  };
  public temp: Object = false;
  assignId: number;
  subscription: Subscription[] = [];

  rejectData: any;
  deviceId: any;
  complainToken:any;
  submitted: boolean = false;
  maintinanceUserList:any[]=[]

  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private toastr: ToastrService,
    private complainservice: ComplainService,
    private modalService: BsModalService,
  ) { }

  dtOptions: DataTables.Settings = {};

  openAssignModel(assignTemplate: TemplateRef<any>, list) {
     //console.log(list);
    this.complainToken = list;
    console.log(this.complainToken);
    this.modalRef = this.modalService.show(assignTemplate, this.config);
  }
  openRejectModel(rejectTemplate: TemplateRef<any>, list) {
    //console.log(list);
   this.complainToken = list;
   console.log(this.complainToken);
   this.modalRef = this.modalService.show(rejectTemplate, this.config);
 }

  ngOnInit(): void {
    this.assignForm = this.formBuilder.group({
      token: ["", Validators.required],
      description: ["", Validators.required],
      maintenanceStaffId: ["", Validators.required]
    });

    this.rejectForm = this.formBuilder.group({
      token: ["", Validators.required],
      description: ["", Validators.required],
      statusCode: ["01"]
    });
    this.complaintlist();
    
    //get maintinance staff list
    this.complainservice.maintinanceStaffList().subscribe(
      (res) => {
        this.maintinanceUserList=res;
      }
      
    )

  }

  get fval() {
      return this.assignForm.controls;
  }
  get fval1() {
    return this.rejectForm.controls;
  }

  complaintlist() {
    this.subscription.push(
      this.complainservice.pendingComplaintList().subscribe(
        (res) => {
          if (res.status === "1") {
            this.complains = res['data'];
            this.temp = true;
          }
          else {
            this.toastr.warning("", res.data);
          }
        },
        (error) => {
          console.log(error);
        }
      )
    );
  }

  onAccept() {
    console.log(this.assignForm.value);

    this.submitted = true;
    if(this.assignForm.invalid){
        return Swal.fire({
            icon:"error",
            text:"Please enter all fields!"
        })
    }

    this.subscription.push(
      this.complainservice
        .postAssignComplaint(this.assignForm.value)
        .subscribe(
          (res) => {
            console.log(res);
            if(res.status==="1"){
              this.successmsg = res;
              this.toastr.success("", this.successmsg.data);
              this.assignForm.reset();
              this.modalRef.hide();
              this.router.navigate(["complaint/progressList",]);
            }else{
              this.successmsg = res;
              this.toastr.error("", this.successmsg.data);
              
            }
            
          },
          (error) => {
            console.log(error);
            this.errormsg = error;
            this.toastr.error("", this.errormsg);
          }
        )
    );
  }

  onReject() {
    this.rejectData = this.rejectForm.value;
    console.log(this.rejectForm.value);

    this.submitted = true;
    if(this.rejectForm.invalid){
        return Swal.fire({
            icon:"error",
            text:"Please enter all fields!"
        })
    }

    this.subscription.push(
      this.complainservice
        .rejectComplaint(this.rejectForm.value)
        .subscribe(
          (res) => {
            if (res.status === "1") {
              this.complains = res['data'];
              console.log(this.complains, 'Reject Complain List');
              this.successmsg = res;
              this.toastr.success("", this.successmsg.data);
              this.assignForm.reset();
              this.modalRef.hide();
              this.router.navigate(["complaint/rejectedList",]);
            }
            else {
              this.toastr.warning("", res.data);
            }
          },
          (error) => {
            console.log(error);
          }
        )
    );
  }

  ngOnDestroy() {
    this.subscription.forEach((subs) => subs.unsubscribe());
  }

}
