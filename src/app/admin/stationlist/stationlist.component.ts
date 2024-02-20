import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { StationService } from '../_services/station.service';
import { Station } from '../_models/station.model';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stationlist',
  templateUrl: './stationlist.component.html',
  styleUrls: ['./stationlist.component.scss']
})

export class StationlistComponent implements OnInit {

    //@ViewChild(DataTableDirective, { static: false })
    //datatableElement: DataTableDirective;
    //dtElement: DataTableDirective;
    //dtTrigger: Subject<any> = new Subject();

    station: Station[]= [];
    public stationData: Object;
    public temp: Object = false;
    searchTerm: any;
    submitted = false;
    error: string;

    modalRef: BsModalRef;
    statusValue: number;
    config = {
        animated: true,
        backdrop: true,
        ignoreBackdropClick: false,
    };
    errormsg: any;


  constructor(
    private stationService: StationService,
    private modalService: BsModalService,
    private toaster: ToastrService,
  ) { }
  //dtOptions: DataTables.Settings = {};


  ngOnInit() {
    this.stationlist();
  }

  // -------- display station list function ----------

  stationlist() {
    // this.stationService.getStation().subscribe(res => {
    //   this.station = res["data"];
    //   this.temp = true;
      
    // });
    this.stationService.getStation().subscribe({
        next:(res)=>{
          if(res.status === "0"){
              this.toaster.error(res.data,'Error!')
          }
          else if(res.status === "1"){
            this.station = res.data;
            this.temp = true;
          }
        },
        error:(err)=>{
            this.toaster.error(err.error.data,'Error!')
        }
      })
  }

  //change station status without confirm prompt (not in use)
  changeStatus(stationCode: string, status:any){
    console.log(stationCode);
    console.log(status);
    // this.stationService.statusUpdate(stationCode, +status).subscribe(
    //   (res) => {
    //       //console.log(res);
    //       if(res.status==="1"){
    //       this.toaster.success("", res.data);
    //       this.stationlist();
    //       }else{
    //       this.toaster.error("",res.data);
    //       this.stationlist();
    //       }
    //   },
    //   (error) => {
    //       this.errormsg = error;
    //       this.toaster.error("", this.errormsg);
    //   });
      this.stationService.statusUpdate(stationCode, +status).subscribe({
        next:(res)=>{
          if(res.status === "0"){
            this.toaster.error("",res.data);
            this.stationlist();
          }
          else if(res.status === "1"){
            this.toaster.success("", res.data);
            this.stationlist();
          }
        },
        error:(err)=>{
            this.errormsg = err.error.data;
          this.toaster.error("", this.errormsg);
        }
      })
  }

  openModal(templateDeactivate: TemplateRef<any>, templateActive: TemplateRef<any>,templateClose: TemplateRef<any>, e) {
        console.log("checked value => "+e.target.value);
        //incoming 0
        if(e.target.value === "0" ){
            this.modalRef = this.modalService.show(templateDeactivate, this.config);
            this.statusValue = 0;
            //e.target.checked = false;
        }
        //incoming 1
        else if(e.target.value === "1"){
            this.modalRef = this.modalService.show(templateActive, this.config);
            this.statusValue = 1;
            //e.target.checked = true;
        }
         //incoming 1
        else if(e.target.value === "2"){
            this.modalRef = this.modalService.show(templateClose, this.config);
            this.statusValue = 2;
            //e.target.checked = true;
        }
        //incoming 2
        else{
            this.modalRef = this.modalService.show(templateActive, this.config);
            this.statusValue = 1;
            e.target.checked = true;
        }
    }

    confirm(stationCode: string) {

        // this.stationService.statusUpdate(stationCode, this.statusValue).subscribe(
        //     (res) => {
        //         //console.log(res);
        //         if(res.status==="1"){
        //         this.toaster.success("", res.data);
        //         this.stationlist();
        //         }else{
        //         this.toaster.error("",res.data);
        //         this.stationlist();
        //         }

        //     },
        //     (error) => {

        //         this.errormsg = error;
        //         this.modalRef.hide();
        //         this.toaster.error("", this.errormsg);
        //     });

        // this.modalRef.hide();
        // this.statusValue=0;

        this.stationService.statusUpdate(stationCode, this.statusValue).subscribe({
            next:(res)=>{
              if(res.status === "0"){
                this.toaster.error("",res.data);
                this.stationlist();
              }
              else if(res.status === "1"){
                this.toaster.success("", res.data);
                this.stationlist();
              }
            },
            error:(err)=>{
                this.errormsg = err.error.data;
                this.modalRef.hide();
                this.toaster.error("", this.errormsg);
            }
          })
          this.modalRef.hide();
          this.statusValue=0;
    }

    decline() {
        this.modalRef.hide();
        this.statusValue=0;
        this.stationlist();
    }



}

