import { Component, OnInit, OnDestroy } from "@angular/core";
// import * as Chart from "chart.js";
import { Subscription } from "rxjs";
import { ProductService } from "../_services";
import { ToastrService } from "ngx-toastr";
@Component({
    selector: "app-equipmentdash",
    templateUrl: "./equipmentdash.component.html",
    styleUrls: ["./equipmentdash.component.scss"],
})
export class EquipmentdashComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    equipments: any;
    specificEqp: any;
    constructor(private productService: ProductService, private toastr:ToastrService) {}

    ngOnInit() {
        this.subscription = 
        // this.productService.equipmentCount().subscribe((res) => {
        //         this.equipments = res["data"];
        // });
        this.productService.equipmentCount().subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.equipments = res.data;
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })

        // this.productService.specificEquipmentCount().subscribe((res) => {
        //     this.specificEqp = res["data"];
        // });
        this.productService.specificEquipmentCount().subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.specificEqp = res.data;
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
