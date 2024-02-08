import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../_services/config.service';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Equipconfig } from '../_model/equipconfig.model';
import { EquipmentService } from '../../equipment/_services/equipment.service';
import { Equipment } from "../../equipment/_models/equipment.model";
import { ProductService } from '../../equipment/_services/product.service';
import { Product } from "../../equipment/_models/product.model";
import { TerminalService } from "../../equipment/_services/terminal.service";
import { GateService } from 'src/app/equipment/_services/gate.service';
import { GateModel } from '../../equipment/_models/gate.model'
import { GateDirection } from 'src/app/equipment/_models/gate-direction.model';


@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.scss']
})
export class ConfigureComponent implements OnInit {
  configForm: UntypedFormGroup;
  submitted = false;
  isSaving = false;
  isDisabled: boolean = true;
  // equipmentList: Equipment[] = [];
  // myarray: any = [];
  // eqAddress: String;
  // productList: Product[];
  // alldata: any = [];
  gateTriggerId;
  // terminalList: any;
  // equipconfigList: Equipconfig[] = [];
  // gateList: any;
  // gate: GateModel[] = [];

  gateList: GateModel[] = [];
  public temp: Object = false;


  // gateList: GateModel[] = [];

  // directionList: GateDirection[];


  constructor(
    private configapi: ConfigService,
    // private terminalapi: TerminalService,
    // private productService: ProductService,
    // private equipmentService: EquipmentService,
    // private router: Router,
    private formBuilder: UntypedFormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private gateService: GateService,
  ) { }

  ngOnInit() {

    this.configForm = this.formBuilder.group({
      gateTriggerId: [''],
      // id: [''],
      productId: ['', Validators.required],
      gateName: ['', Validators.required],
      line: ['', Validators.required],
      station: ['', Validators.required],

      gateDirection: ['', Validators.required],
      // direction: ['', Validators.required],

      termID1: ['', Validators.required],
      terminalIpAddress1: ["", Validators.required],
      activationTime1: ['', Validators.required],
      deactivationTime1: ['', Validators.required],
      editable1: ['', Validators.required],
      entryExitOverride1: ['', Validators.required],
      timeModeOverride1: ['', Validators.required],
      highSecurityMode1: ['', Validators.required],

      termID2: ['', Validators.required],
      terminalIpAddress2: ["", Validators.required],
      activationTime2: ['', Validators.required],
      deactivationTime2: ['', Validators.required],
      editable2: ['', Validators.required],
      entryExitOverride2: ['', Validators.required],
      timeModeOverride2: ['', Validators.required],
      highSecurityMode2: ['', Validators.required],

      aisleMode: ['', Validators.required],
      emergencyMode: ['', Validators.required],
      buzzerVolume: ['', Validators.required],
      flapSafetyTime: ['', Validators.required],
      gateResetTime: ['', Validators.required],
      sensorInactTime: ['', Validators.required],
      lightIntensity: ['', Validators.required],
      queLength: ['', Validators.required],
      modifiedDateTime: ['', Validators.required],
      actionType: ['', Validators.required],
      version: ['', Validators.required],
      direction1: ['', Validators.required],
      direction2: ['', Validators.required],
      direction: ['', Validators.required],


      // moduleId: ['', Validators.required],
      // mode: ['', Validators.required],
      // subMode: ['', Validators.required],      
      // gateDirection: ['', Validators.required]

    });

    this.configapi.getAllequipement().subscribe((data) => {
      this.gateList = data;
      // this.temp = true;
      console.log(this.gateList, "Gate & Terminal Data");
    });

    this.route.paramMap.subscribe((params) => {
      const Iid = +params.get("gateTriggerId");
      if (Iid) {
        this.getGateData(Iid);
      }
    });

    // this.equipmentService.getEquipment().subscribe(
    //   (data) => {
    //     this.equipmentList = data;
    //     console.log(data);
    //     this.myarray = data;
    //   },
    //   (error) => {  
    //     console.log(error);
    //   }
    // );

    // this.terminalapi.getTerminalList().subscribe((res) => {
    //   this.terminalList = res;
    //   console.log(res);
    // });

    // this.gateService.getAllGate().subscribe((res) => {
    //   this.gateList = res;
    //   // this.temp = true;
    //   // console.log(res, "gatelist");
    //   console.log(this.gateList, "Gate RESPONSE");

    // });

    // this.gateService.getGateDirection().subscribe((res) => {
    //   this.directionList = res;
    //   console.log(res);
    // });



  }

  get fval() {
    return this.configForm.controls;
  }

  getGateData(gateTriggerId: number) {
    this.configapi.getgateById(gateTriggerId).subscribe(
      (gateList: GateModel) => this.configureGate(gateList),
      (error: any) => console.log(error)
    );

  }

  configureGate(gateList: GateModel) {
    this.configForm.patchValue({

      gateTriggerId: gateList.gateTriggerId,
      // id: gateList.productId,
      // id: gateList.id,
      productId: gateList.productId.id,
      gateName: gateList.gateName,
      line: gateList.line.id,
      station: gateList.station.id,

      termID1: gateList.termID1.id,
      terminalIpAddress1: gateList.terminalIpAddress1,
      activationTime1: gateList.activationTime1,
      deactivationTime1: gateList.deactivationTime1,
      editable1: gateList.editable1,
      entryExitOverride1: gateList.entryExitOverride1,
      timeModeOverride1: gateList.timeModeOverride1,
      highSecurityMode1: gateList.highSecurityMode1,

      termID2: gateList.termID2.id,
      terminalIpAddress2: gateList.terminalIpAddress2,
      activationTime2: gateList.activationTime2,
      deactivationTime2: gateList.deactivationTime2,
      editable2: gateList.editable2,
      entryExitOverride2: gateList.entryExitOverride2,
      timeModeOverride2: gateList.timeModeOverride2,
      highSecurityMode2: gateList.highSecurityMode2,

      aisleMode: gateList.aisleMode,
      emergencyMode: gateList.emergencyMode,
      buzzerVolume: gateList.buzzerVolume,
      flapSafetyTime: gateList.flapSafetyTime,
      gateResetTime: gateList.gateResetTime,
      sensorInactTime: gateList.sensorInactTime,
      lightIntensity: gateList.lightIntensity,
      queLength: gateList.queLength,
      actionType: gateList.actionType,
      version: gateList.version,
      direction1: gateList.direction1.id,
      direction2: gateList.direction2.id,
      direction: gateList.direction,

      // moduleId: gateList.moduleId,
      // mode: gateList.mode,
      // subMode: gateList.subMode,
      // direction: gateList.direction,      
      gateDirection: gateList.gateDirection.id

    });
  }

  onFormSubmit() {
    this.submitted = true;
    this.isSaving = true;
    //if (this.configForm.invalid)
    //return this.toastr.error('Invalid Form', 'Error');
    console.log('Form submitted.',
      this.configForm.value.gateTriggerId);

    this.configapi
      .putgate(
        this.configForm.value.gateTriggerId,
        this.configForm.value
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.toastr.info("", "Updated Successfully", {
            progressBar: true,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    // console.log(this.configForm.value);
    this.toastr.info("Updated Successfully.");
    this.configForm.reset();
    this.submitted = false;
    // this.router.navigate(["stationdashboard"]);
  }

}
