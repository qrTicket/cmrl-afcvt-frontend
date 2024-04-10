import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { environment } from "src/environments/environment";
import { Product } from "../_models/product.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ProductType } from "../_models/product-type.model";
@Injectable({
    providedIn: "root",
})
export class ProductService {

    addEquipmentEndUrl:string = "api/afc/equipment/save"

    constructor(private http: HttpClient) {}

    private token: string = localStorage.getItem("token");
    private httpOptions = {
        headers: new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
        }),
    };

    
    postProduct(payload: any) {
        return this.http.post<any>(`${environment.BASEURL}/${this.addEquipmentEndUrl}`,payload,this.httpOptions);
    }

    getProductList() {
        return this.http.get<any>(
            `${environment.productUrl}/equipment/all`,
            this.httpOptions
        );
    }

    deleteProduct(id: number): Observable<Product> {
        return this.http.delete<Product>(
            `${environment.productUrl}/delete/${id}`,
            this.httpOptions
        );
    }

    getEquipmentById(id: number) {
        return this.http.get(
            `${environment.productUrl}/equipment/all/${id}`,
            this.httpOptions
        );
    }

    updateEquipment(id: number, payload: any) {
        return this.http.put(`${environment.productUrl}/equipment/update/${id}`,payload,this.httpOptions);
    }

    deleteEquipment(id) {
        return this.http.delete(
            `${environment.productUrl}/equipment/delete/${id}`,
            this.httpOptions
        );
    }

    getManufacturerList() {
        return this.http.get(
            `${environment.productUrl}/manufacturer/list`,
            this.httpOptions
        );
    }
    assignEquipment(stationCode: String, id) {
        return this.http.post(
            `${environment.productUrl}/equipment/update/${id}`,
            stationCode,
            this.httpOptions
        );
    }
    allAssignedEquipment() {
        return this.http.get(
            `${environment.productUrl}/equipment/assigned/all`,
            this.httpOptions
        );
    }
    allUnassignedEquipment() {
        return this.http.get(
            `${environment.productUrl}/equipment/notassigned/all`,
            this.httpOptions
        );
    }

    equipmentType() {
        return this.http.get(
            `${environment.productUrl}/equipment/types/all`,
            this.httpOptions
        );
    }

    equipmentCount() {
        return this.http.get(
            `${environment.productUrl}/counts`,
            this.httpOptions
        );
    }
    specificEquipmentCount() {
        return this.http.get(
            `${environment.productUrl}/equipments/count`,
            this.httpOptions
        );
    }
    stationCount(stationCode: any) {
        return this.http.get(
            `${environment.productUrl}/equipment/station/count/${stationCode}`,
            this.httpOptions
        );
    }

    assignNonAssigned() {
        return this.http.get(
            `${environment.productUrl}/equipment/assignednonassigned/all`, this.httpOptions
        );
    }
}
