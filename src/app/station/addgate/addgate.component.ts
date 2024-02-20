import { Component, OnInit, NgZone } from "@angular/core";
import { ConfigService } from "../_services/config.service";
import { Equipconfig } from "../_model/equipconfig.model";
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { EquipmentService } from "../../equipment/_services/equipment.service";
@Component({
    selector: "app-addgate",
    templateUrl: "./addgate.component.html",
    styleUrls: ["./addgate.component.scss"],
})
export class AddgateComponent implements OnInit {
    addForm: FormGroup;
    submitted = false;
    selectedFile: File;
    equipmentList: any = [];
    myarray: any = [];
    eqAddress: String;

    constructor(
        private configapi: ConfigService,
        private equipmentService: EquipmentService,
        private formBuilder: FormBuilder,
        private router: Router,
        private toastr: ToastrService,
        private http: HttpClient
    ) {}

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            // terminalId: ['', Validators.required],
            equipmentId: ["", Validators.required],
            // equipmentIpAddress: ['', Validators.required],
            moduleId: ["", Validators.required],
            editable: ["", Validators.required],
            activationTime: ["", Validators.required],
            deactivationTime: ["", Validators.required],
            actionType: ["", Validators.required],
            version: ["", Validators.required],
            mode: ["", Validators.required],
            subMode: ["", Validators.required],
            direction: ["", Validators.required],
            aisleMode: ["", Validators.required],
            entryExitOvride: ["", Validators.required],
            timeModeOvride: ["", Validators.required],
            highSecurityMode: ["", Validators.required],
            queLength: ["", Validators.required],
            flapSafetyTime: ["", Validators.required],
            gateResetTime: ["", Validators.required],
            buzzerVolume: ["", Validators.required],
            lightIntensity: ["", Validators.required],
            sensorInactTime: ["", Validators.required],
        });

        // this.equipmentService.getEquipment().subscribe(
        //     (data) => {
        //         this.equipmentList = data;
        //         console.log(data);
        //         this.myarray = data;
        //     },
        //     (error) => {
        //         console.log(error);
        //     }
        // );
        this.equipmentService.getEquipment().subscribe({
            next:(res)=>{
                this.equipmentList = res;
                console.log(res);
                this.myarray = res;
            },
            error:(err)=>{
                this.toastr.error(err.error,'Error!')
            }
          })
    }
    get fval() {
        return this.addForm.controls;
    }

    onFormSubmit() {
        this.submitted = true;
        console.log("form submit clicked..");
        if (this.addForm.invalid) {
            return this.toastr.error("Invalid Form", "Error");
        }
        // this.configapi.postequipement(this.addForm.value).subscribe((res) => {
        //     console.log(res, "Response");

        //     //  console.log(this.addFrom.value);
        // });
        this.configapi.postequipement(this.addForm.value).subscribe( {
            next:(res)=>{
                if(res.status === "0"){
                    this.toastr.error(res.data,'Error!')
                }
                else if(res.status === "1"){
                    this.toastr.success("Equipement configured Succeddfully", "Success");
                    this.router.navigate(["/equipementlist"]);
                }
              },
              error:(err)=>{
                  this.toastr.error(err.error.data,'Error!')
              }
        });


        // this.toastr.success("Equipement configured Succeddfully", "Success");
        // this.router.navigate(["/equipementlist"]);
        // this.configForm.reset();
    }

    // private onUpload(imageFor) {
    //   const fd = new FormData();
    //   fd.append('imageFile', this.selectedFile, this.selectedFile.name);
    //   this.http.post('https://localhost:4200/assets/images', fd)
    //     .subscribe(res => imageFor === 'EQUIPIMG' );
    // }

    // onFileSelected(event, imageFor) {
    //   this.selectedFile = <File>event.target.files[0];
    //   this.onUpload(imageFor);
    // }

    passStrength(value: string, lbl: string) {
        var result = value.replace(": Object", "");

        var obj = this.myarray;
        for (var i = 0; i < obj.length; i++) {
            if (obj[i].id == result) {
                //  this.eqAddress=obj[i].equipmentIpAddress;
                $("#" + lbl).val(obj[i].equipmentIpAddress);
            }
        }
        console.log(obj);
    }
}
