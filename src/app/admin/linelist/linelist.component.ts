import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { LinesService } from "../_services/lines.service";
import { DataTableDirective } from "angular-datatables";
import { Line } from "../_models/lines.model";
import { Subject } from "rxjs";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Component({
    selector: "app-linelist",
    templateUrl: "./linelist.component.html",
    styleUrls: ["./linelist.component.scss"],
})
export class LinelistComponent implements OnInit {
    //@ViewChild(DataTableDirective, { static: false })
    //datatableElement: DataTableDirective;
    //dtElement: DataTableDirective;
    //dtTrigger: Subject<any> = new Subject();

    //line: Line[] = [];
    line: any[] = [];
    public lineData: Object;
    public temp: Object = false;
    searchTerm: any;

    modalRef: BsModalRef;
    statusValue: number;
    config = {
        animated: true,
        backdrop: true,
        ignoreBackdropClick: false,
    };
    errormsg: any;


    constructor(
        private lineService: LinesService,
        private modalService: BsModalService,
        private toaster: ToastrService,
        private router: Router,
        ) {}
    //dtOptions: DataTables.Settings = {};

    ngOnInit() {
        this.linelist();
    }

    linelist() {
        this.lineService.getLines().subscribe((res) => {
            this.line = res["data"];
            this.temp = true;
            console.log(res);

            // this.dtOptions = {
            //     pagingType: "full_numbers",
            //     pageLength: 5,
            //     scrollX: true,
            //     processing: true,
            // };
            // this.dtTrigger.next();

        });
        this.lineService.getLines().subscribe({
            next:(res)=>{
              if(res.status === "0"){
                  this.toaster.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.line = res.data;
                this.temp = true;
              }
            },
            error:(err)=>{
                this.toaster.error(err.error.data,'Error!')
            }
          })
          
    }

    openModal(templateDeactivate: TemplateRef<any>, templateActive: TemplateRef<any>, e) {
        console.log("checked value => "+e.target.value);
        //incoming 0
        if(e.target.value === "0" ){
            this.modalRef = this.modalService.show(templateActive, this.config);
            this.statusValue = 1;
            e.target.checked = false;
        }
        //incoming 1
        else if(e.target.value === "1"){
            this.modalRef = this.modalService.show(templateDeactivate, this.config);
            this.statusValue = 0;
            e.target.checked = true;
        }
        //incoming 2
        else{
            this.modalRef = this.modalService.show(templateActive, this.config);
            this.statusValue = 1;
            e.target.checked = true;
        }
    }
    confirm(lineCode: string, status:number) {

        // this.lineService.statusUpdate(lineCode, this.statusValue).subscribe(
        //     (res) => {
        //         //console.log(res);
        //         if(res.status==="1"){
        //           this.toaster.success("", res.data);
        //           this.linelist();
        //           //this.router.navigate(["admin/linelist"]);
        //         }else{
        //           this.toaster.error("",res.data);
        //           this.linelist();
        //          // this.router.navigate(["admin/linelist"]);
        //         }
        //     },
        //     (error) => {

        //         this.errormsg = error;
        //         this.modalRef.hide();
        //         this.toaster.error("", this.errormsg);
        //     });

            this.lineService.statusUpdate(lineCode, this.statusValue).subscribe({
                next:(res)=>{
                  if(res.status === "0"){
                    this.toaster.error("",res.data);
                  }
                  else if(res.status === "1"){
                    this.toaster.success("", res.data);
                  this.linelist();
                  }
                },
                error:(err)=>{
                    this.toaster.error("",err.error.data);
                }
              })

        this.modalRef.hide();
    }

    decline() {
        this.modalRef.hide();
    }

    

}
