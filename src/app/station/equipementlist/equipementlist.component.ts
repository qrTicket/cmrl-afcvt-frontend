import { Component, OnInit, ViewChild } from '@angular/core';
//import { routerTransition } from '../../router.animations';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { ConfigService } from '../_services/config.service';
// import { Equipconfig } from '../_model/equipconfig.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { GateModel } from '../_model/gate.model';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-equipementlist',
    templateUrl: './equipementlist.component.html',
    styleUrls: ['./equipementlist.component.scss'],
    // animations: [routerTransition()]
})
export class EquipementlistComponent implements OnInit {

    @ViewChild(DataTableDirective)
    datatableElement: DataTableDirective;
    dtElement: DataTableDirective;
    dtTrigger: Subject<any> = new Subject();

    equips: GateModel[];
    // any = [];
    public empData: Object;
    public temp: Object = false;
    searchTerm: any;
    // equipmentList: Equipconfig[];
    constructor(
        private configapi: ConfigService,
        private http: HttpClient,
        private router: Router,
        private toastr: ToastrService
    ) { }
    dtOptions: DataTables.Settings = {};


    ngOnInit() {
        this.equipemntlist();
    }

    equipemntlist() {
        // this.configapi.getAllequipement().subscribe(data => {
        //     this.equips = data;
        //     console.log(this.equips, "Equipment List");
        //     this.dtOptions = {
        //         pagingType: 'full_numbers',
        //         pageLength: 5,
        //         processing: true
        //     };
        //     this.dtTrigger.next(true); // to rerender the table when next function is called 
        // });
        this.configapi.getAllequipement().subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                  this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.equips = res.data;
                console.log(this.equips, "Equipment List");
                this.dtOptions = {
                    pagingType: 'full_numbers',
                    pageLength: 5,
                    processing: true
                };
                this.dtTrigger.next(true); // to rerender the table when next function is called
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })
    }

    configgate(item) {
        console.log(item.gateTriggerId);
        console.log(item);

        this.router.navigate(["/configure", item.gateTriggerId]);
    }

    // to reload the data from datable when sorting or filtering function is called 

    rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next(true);
        });
    }


}
