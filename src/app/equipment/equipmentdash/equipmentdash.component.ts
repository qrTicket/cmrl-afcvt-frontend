import { Component, OnInit, OnDestroy } from "@angular/core";
// import * as Chart from "chart.js";
import { Subscription } from "rxjs/Subscription";
import { ProductService } from "../_services";
@Component({
    selector: "app-equipmentdash",
    templateUrl: "./equipmentdash.component.html",
    styleUrls: ["./equipmentdash.component.scss"],
})
export class EquipmentdashComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    equipments: any;
    specificEqp: any;
    constructor(private productService: ProductService) {}

    ngOnInit() {
        this.subscription = this.productService
            .equipmentCount()
            .subscribe((res) => {
                this.equipments = res["data"];
            });

        this.productService.specificEquipmentCount().subscribe((res) => {
            this.specificEqp = res["data"];
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
