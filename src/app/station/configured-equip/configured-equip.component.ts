import { Component, OnInit, TemplateRef } from "@angular/core";
import { Router } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { GateConfig } from "../_model/gate-config.model";
import { StationService } from "../_services/station.service";
import { ToastrService } from "ngx-toastr";
import { Subscription } from 'rxjs';
import { ComplaintService } from '../_services/complaint.service';

@Component({
    selector: "app-configured-equip",
    templateUrl: "./configured-equip.component.html",
    styleUrls: ["./configured-equip.component.scss"],
})
export class ConfiguredEquipComponent implements OnInit {
    public temp: Boolean = false;
    configuredList: GateConfig[];

    subscriptions: Subscription[] = [];
    successmsg: any;
    errormsg: any;
    complaintForm: UntypedFormGroup;
    modalRef: BsModalRef;
    config = {
        animated: true,
        backdrop: true,
        ignoreBackdropClick: false,
    };
    // public temp: Object = false;
    assignId: number;
    subscription: Subscription[] = [];
    deviceId: any;
    
    constructor(
        private router: Router,
        private toastr: ToastrService,
        private formBuilder: UntypedFormBuilder,
        private modalService: BsModalService,
        private stationAPI: StationService,
        private complaintAPI: ComplaintService
    ) { }

    openAssignModel(assignTemplate: TemplateRef<any>, list) {
        this.assignId = list;
        this.modalRef = this.modalService.show(assignTemplate, this.config);
    }
    ngOnInit() {
        this.complaintForm = this.formBuilder.group({
            deviceId: ["", Validators.required],
            problemDescription: ["", Validators.required]
        });

        // this.stationAPI.getConfiguredEquip().subscribe((res) => {
        //     this.configuredList = res['data'];
        //     this.temp = true;
        // });

        this.stationAPI.getConfiguredEquip().subscribe({
            next:(res)=>{
              if(res.status === "0"){
                  this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.configuredList = res.data;
                this.temp = true;
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })
    }

    editConfig(list) {
        this.router.navigate(["/edit-config", list.gcId]);
    }

    //navigate to raise complain page with device id
    raiseComplain(device_id){
        this.router.navigate(["/raisecomplaint", device_id]);
    }

    onAccept() {
        // this.subscription.push(this.complaintAPI.postComplaint(this.complaintForm.value).subscribe(
        //             (res) => {
        //                 // console.log(res);
        //                 this.successmsg = res;
        //                 this.toastr.success("", this.successmsg.data);
        //                 this.complaintForm.reset();
        //                 this.modalRef.hide();
        //                 // this.router.navigate(["complaint/progressList",]);
        //             },
        //             (error) => {
        //                 // console.log(error);
        //                 this.errormsg = error;
        //                 this.toastr.error("", this.errormsg);
        //             }
        //         )
        // );

        this.subscription.push( this.complaintAPI.postComplaint(this.complaintForm.value).subscribe({
            next:(res)=>{
              if(res.status === "0"){
                  this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.successmsg = res;
                this.toastr.success("", this.successmsg.data);
                this.complaintForm.reset();
                this.modalRef.hide();
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          }))

       
    }

}
