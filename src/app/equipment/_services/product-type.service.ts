import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ProductType } from "../_models/product-type.model";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
@Injectable({
    providedIn: "root",
})
export class ProductTypeService {
    constructor(private http: HttpClient) {}
    productTypeList: ProductType[];

    private token: string = localStorage.getItem("token");

    private httpOptions = {
        headers: new HttpHeaders({
            Authorization: `Bearer ${this.token}`,
            "Content-Type": "application/json",
        }),
    };

    postProductType(payload: ProductType): Observable<any> {
        const saveProduct = {
            equipmentTypeId: payload.equipmentTypeId,
            equipmentTypeName: payload.equipmentTypeName,
            equipmentTypeShortName: payload.equipmentTypeShortName.toUpperCase(),
        };
        return this.http.post<any>(
            `${environment.productUrl}/equipment/types/save`,
            saveProduct,
            this.httpOptions
        );
    }

    getProductTypeList(): Observable<ProductType[]> {
        return this.http.get<ProductType[]>(
            `${environment.productUrl}/equipment/types/all`,
            this.httpOptions
        );
    }
    deleteById(id: number): Observable<ProductType> {
        return this.http.delete<ProductType>(
            `${environment.productUrl}/equipment/types/delete/${id}`,
            this.httpOptions
        );
    }

    getById(id: number) {
        return this.http.get(
            `${environment.productUrl}/equipment/types/all/${id}`,
            this.httpOptions
        );
    }

    //this will hit backend API with id and body
    editEquipmentType(id: number, body: ProductType) {
        const updateEquipment = {
            equipmentTypeId: body.equipmentTypeId,
            equipmentTypeName: body.equipmentTypeName,
            equipmentTypeShortName: body.equipmentTypeShortName.toUpperCase(),
        };
        return this.http.put(
            `${environment.productUrl}/equipment/types/update/${id}`,
            updateEquipment,
            this.httpOptions
        );
    }

   

}
