import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ElementRef,
    AfterViewInit,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";

import { ProductService } from "../_services/product.service";
import { AddUserService } from "../../user-manger/_services/add-user.service";
import { ToastrService } from "ngx-toastr";
import { EquipmentService } from "../_services";
import { saveAs } from 'file-saver';

@Component({
    selector: "app-assign-list",
    templateUrl: "./assign-list.component.html",
    styleUrls: ["./assign-list.component.scss"],
})
export class AssignListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('fileExtn') fileExtn:ElementRef<any>;
    @ViewChild("container", { static: true }) container: ElementRef;
    el: HTMLElement;
    stationCountForm: FormGroup;
    subscriptions: Subscription[] = [];
    assignEquipmentList: any;
    public temp: Boolean = false;
    stationList: any;
    equipementDetails: any;
    isVisible: Boolean;
    stationCode: any;
    myObject: any;
    fileExtension:any[];


    constructor(
      private fb: FormBuilder,
      private productAPI: ProductService,
      private userService: AddUserService,
      private spinner: NgxSpinnerService,
      private toastr :ToastrService,
      private equipSrv:EquipmentService 
    ) {}

    ngOnInit() {
        this.stationCountForm = this.fb.group({
            station: ["", Validators.required],
        });

        this.subscriptions.push(
            // this.productAPI.allAssignedEquipment().subscribe((res) => {
            //     this.assignEquipmentList = res["data"];
            //     this.temp = true;
            // })
            this.productAPI.allAssignedEquipment().subscribe({
                next:(res:any)=>{
                  if(res.status === "0"){
                    this.toastr.error(res.data,'Error!')
                  }
                  else if(res.status === "1"){
                    this.assignEquipmentList = res.data;
                    this.temp = true;
                  }
                },
                error:(err)=>{
                    this.toastr.error(err.error.data,'Error!')
                }
              })
        );


        // this.userService.getAllStation().subscribe((res) => {
        //     this.stationList = res["data"];
        // });
        this.userService.getAllStation().subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.stationList = res.data;
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })


        this.subscriptions.push(
            this.stationCountForm.controls["station"].valueChanges.subscribe(
                (res) => {
                    this.stationCode = res;
                    console.log(res);
                }
            )
        );

        this.getFileExtensionList();
    }

    // get file extension for custom filter
  getFileExtensionList(){
    this.equipSrv.getFileExtensionForAssignedEquipments().subscribe({
      next:(resp:any)=>{
        if(resp["status"] === "1"){
          this.fileExtension = resp.data;
          console.log(this.fileExtension);
        }
      },
      error:(err:any)=>{
        this.toastr.error(err.error.data,'ERROR')
      }
    })
  }

  onFileExtensionChange(e:any){
    let fileExt = e.target.value;

    this.equipSrv.downloadFileForAssignedEquipment(fileExt).subscribe({
      next:(resp:any)=>{
        const blob = new Blob([resp], {type:'*/*'});
        saveAs(blob,`AssignedEquipment.${fileExt}`);
        this.fileExtn.nativeElement.value = "";
      },
      error:(err:any)=>{
        this.toastr.error(err.error.data,'ERROR')
      }
    })
  }

    ngAfterViewInit() {
        // this.el = this.container.nativeElement;
    }

    onSubmit() {
        this.spinner.show();
        // const stationCode = Object.values(this.stationCountForm.value)[0];
        this.subscriptions.push(
            // this.productAPI.stationCount(this.stationCode).subscribe(
            //     (res) => {
            //         console.log(res);
            //         this.spinner.hide();
            //         this.equipementDetails = res["data"];
            //         //   console.log(this.equipementDetails);

            //         this.isVisible = true;
            //     },
            //     (error) => {
            //         this.spinner.hide();
            //         console.log(error);
            //     }
            // )
            this.productAPI.stationCount(this.stationCode).subscribe({
                next:(res:any)=>{
                  if(res.status === "0"){
                    this.spinner.hide();
                    this.toastr.error(res.data,'Error!')
                  }
                  else if(res.status === "1"){
                    console.log(res);
                    this.spinner.hide();
                    this.equipementDetails = res.data;
                    this.isVisible = true;
                  }
                },
                error:(err)=>{
                    this.spinner.hide();
                    this.toastr.error(err.error.data,'Error!')
                }
              })
        );
    }
    onClearHandler() {
        this.isVisible = false;
        this.stationCountForm.reset();
        // this.el.className = 'closing'
    }

    ngOnDestroy() {
        this.subscriptions.forEach((subs) => subs.unsubscribe());
    }
}
