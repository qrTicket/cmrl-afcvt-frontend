import {
  Component, OnInit, ViewChild, TemplateRef
} from '@angular/core';
import 'rxjs/Rx';
import { MainService } from '../_mainservices/main.service';
import { DataTableDirective } from 'angular-datatables';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ComplainService } from 'src/app/complaint/_complainservices/complain.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-complain-list',
  templateUrl: './complain-list.component.html',
  styleUrls: ['./complain-list.component.scss']
})
export class ComplainListComponent implements OnInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  complains: any;
  public complainlistData: Object;
  subscriptions: Subscription[] = [];
  successmsg: any;
  errormsg: any;


  assignForm: UntypedFormGroup;
  modalRef: BsModalRef;
  config = {
    animated: true,
    backdrop: true,
    ignoreBackdropClick: false,
  };
  public temp: Object = false;
  assignId: number;
  subscription: Subscription[] = [];
  complaintStatusList:any[]=[];

  rejectData: any;
  submitted: boolean;

  constructor(
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private toastr: ToastrService,
    private mainservice: MainService,
    private complainservice: ComplainService,
    private modalService: BsModalService,
  ) { }

  dtOptions: DataTables.Settings = {};

  openAssignModel(assignTemplate: TemplateRef<any>, list) {
    this.assignId = list;
    this.modalRef = this.modalService.show(assignTemplate, this.config);
  }
  ngOnInit(): void {
    this.assignForm = this.formBuilder.group({
      token: ["", Validators.required],
      statusCode: ["", Validators.required],
      description: ["", Validators.required]
    });
    this.complaintlist();

     //get complaint status list
    this.complainservice.getComplaintStatusList().subscribe(
      (res) => {
        this.complaintStatusList=res;
      }
      
    )
  }

  get fval() {
      return this.assignForm.controls;
  }


  complaintlist() {
    this.subscription.push(
      this.complainservice.maintenancePendingComplaintList().subscribe(
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
          // console.log(error);
        }
      )
    );
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
      this.mainservice
        .closeComplaint(this.assignForm.value)
        .subscribe(
          (res) => {
            console.log(res);
            this.successmsg = res;
            this.toastr.success("", this.successmsg.data);
            this.assignForm.reset();
            this.modalRef.hide();
            this.router.navigate(["/inprogress-complain-list",]);
          },
          (error) => {
            console.log(error);
            this.errormsg = error;
            this.toastr.error("", this.errormsg);
          }
        )
    );
  }

  ngOnDestroy() {
    this.subscription.forEach((subs) => subs.unsubscribe());
  }

}