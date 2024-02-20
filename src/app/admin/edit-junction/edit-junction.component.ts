import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router, ActivatedRoute } from "@angular/router";
import { Station } from "../_models/station.model";
import { StationService } from "../_services/station.service";
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-edit-junction',
  templateUrl: './edit-junction.component.html',
  styleUrls: ['./edit-junction.component.scss']
})
export class EditJunctionComponent implements OnInit {

  junction: Station[] = [];
  editjunctionForm: FormGroup;
  submitted = false;
  isDisabled: boolean = true;

  successmsg;
  errormsg;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router, 
    private activeRouter: ActivatedRoute,
    private toastr: ToastrService,
    private stationService: StationService,
  ) { }

  ngOnInit() {

    this.editjunctionForm = this.formBuilder.group({
      id: ["", RxwebValidators.required({ message: "Required!", }),],
      stationCode: ["", RxwebValidators.required({ message: "Required!", }),],
      // line: ["", RxwebValidators.required({ message: "Required!", }),],
      stationName: ["", RxwebValidators.required({ message: "Required!", }),],
      shortName: ["", RxwebValidators.required({ message: "Required!", }),],
      line1: ["", RxwebValidators.required({ message: "Required!", }),],
      line2: ["", RxwebValidators.required({ message: "Required!", }),],
      line3: ["", RxwebValidators.required({ message: "Required!", }),],
      line4: ["", RxwebValidators.required({ message: "Required!", }),],
      // junction: ["", RxwebValidators.required({ message: "Required!", }),],
      createdDate: ["", RxwebValidators.required({ message: "Required!", }),]
    });

    this.activeRouter.paramMap.subscribe((params) => {
      const id = +params.get("id");
      if (id) {
        this.getDetail(id);
      }
    });


  }

  get fval() {
    return this.editjunctionForm.controls;
  }

  getDetail(id: number) {
    // this.stationService.getJunctionById(id)
    //   .subscribe(
    //     (junction: Station) => this.updateJunction(junction),
    //     (error: any) => console.log(error)
    //   );

      this.stationService.getJunctionById(id).subscribe({
        next:(res:any)=>{
          if(res.status === "0"){
              this.toastr.error(res.data,'Error!')
          }
          else if(res.status === "1"){
            this.updateJunction(res.data)
          }
        },
        error:(err)=>{
            this.toastr.error(err.error.data,'Error!')
        }
      })
  }

  updateJunction(junction: Station) {
    this.editjunctionForm.setValue({
      id: junction.id,
      stationCode: junction.stationCode,
      // line: station.line.id,
      stationName: junction.stationName,
      // shortName: junction.shortName,
      // line1: junction.line1,
      // line2: junction.line2,
      // line3: junction.line3,
      // line4: junction.line4,
      // createdDate: junction.createdDate,
    });

  }

  //-----------------------------------------------------------------------------------------
  // OnFormSubmit working code

  onFormSubmit() {
    this.submitted = true;
    if (this.editjunctionForm.invalid)
      return this.toastr.error("Unable to update form: please check all the details", "Error");
    console.log(this.editjunctionForm.value);

    // this.stationService.putJunction(this.editjunctionForm.value.id,
    //   this.editjunctionForm.value)
    //   .subscribe((res) => {
    //     this.successmsg = res;
    //     // this.toastr.success("", this.successmsg.message);
    //   });
    // this.toastr.success("Junction updated successfully.", this.successmsg);
    // this.editjunctionForm.reset();
    // this.submitted = false;
    // this.router.navigate(['admin/junctionlist']);

    this.stationService.putJunction(this.editjunctionForm.value.id,this.editjunctionForm.value).subscribe({
      next:(res:any)=>{
        if(res.status === "0"){
            this.toastr.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.successmsg = res.data;
          this.toastr.success("Junction updated successfully.", this.successmsg);
          this.editjunctionForm.reset();
          this.submitted = false;
          this.router.navigate(['admin/junctionlist']);
        }
      },
      error:(err)=>{
          this.toastr.error(err.error.data,'Error!')
      }
    })
  }

  //---------------------------------------------------------------------------------------



}
