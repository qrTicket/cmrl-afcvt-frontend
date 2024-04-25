import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NumericValueType, RxwebValidators } from "@rxweb/reactive-form-validators";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import Swal from "sweetalert2";
import { AddUsermanager } from "../_models/add-usermanager.model";
import { AddUsermanagerService } from "../_services/add-usermanager.service";


@Component({
  selector: 'app-update-usermanager',
  templateUrl: './update-usermanager.component.html',
  styleUrls: ['./update-usermanager.component.scss']
})
export class UpdateUsermanagerComponent implements OnInit {

  updateUser: FormGroup;
  submitted = false;
  successmgs;
  errormsg;
  
  usersList: AddUsermanager[];

  subscription: Subscription[] = [];
  roleList: any;
  rolesArray:string[] = [];
  updateArray:string[] = [];
  roleError:boolean = false;
  stationList: any;
  showStationCode:boolean = false;
  status:any;


  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private addUserService: AddUsermanagerService,
      private spinner: NgxSpinnerService,
      private toastr: ToastrService,
      private router : Router
  ) {}

  ngOnInit() {
      this.updateUser = this.formBuilder.group({
          name:[
                  "", 
                  [
                      RxwebValidators.required({message:'This field is required!'}),
                      RxwebValidators.alpha({ message: "This will accept only alphabets!", allowWhiteSpace: true  }),
                      RxwebValidators.minLength({
                        value: 3,
                        message: "Minimum 3 characters required!",
                      }),
                  ]
              ],
          username:[
                    "", 
                    [
                        RxwebValidators.required({message:'This field is required!'}),
                        // RxwebValidators.minLength({
                        //     value: 4,
                        //     message: "Minimum 4 digits required!",
                        // }),
                    ]
                ],
          email:[
                  "", 
                  [
                      RxwebValidators.required({message:'This field is required!'}),
                      RxwebValidators.email({message: "Email is not valid!" }),
                  ]
              ],
          empId:
          [
                  "", 
                  [
                      RxwebValidators.required({message:'This field is required!'}),
                      RxwebValidators.numeric({
                          acceptValue:NumericValueType.PositiveNumber,
                          allowDecimal:false,
                          message: "This will accept only Numbers!"
                      })
                  ]
          ],
          roles:[ this.updateArray ],
          mobileNumber:
          [
              "", 
              [
                  RxwebValidators.required({message:'This field is required!'}),
                  RxwebValidators.pattern({
                      expression: { onlyDigit: /^[6-9]\d{9}$/ },
                      message: "Invalid mobile number!",
              }),
              ]
          ],
          status:  this.status 
      });
      
      this.addUserService.userList().subscribe({
        next:(res:any)=>{
          if(res.status === "0"){
              this.toastr.error(res.data)
          }
          else if(res.status === "1"){
            this.usersList = res.data;
          }
        },
        error:(err)=>{
            this.toastr.error(err.error.data)
        }
      })
      
      
      this.patchFormValue();

      this.subscription.push(
          this.addUserService.getAllRoles().subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                  this.toastr.error(res.data)
              }
              else if(res.status === "1"){
                this.roleList = res.data;
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data)
            }
          })
      );
       
      let x:number = 0;
      for(x; x < this.addUserService.userData.roles.length; x++){
          this.rolesArray.push(this.addUserService.userData.roles[x].roleCode);
      }        
  }//ngOnInit ends

  patchFormValue(){
      this.updateUser.patchValue(this.addUserService.userData);
      this.status = this.addUserService.userData.status;
  }

  get fval(){
      return this.updateUser.controls;
  }
  

  onChange(e){
      if(e.target.checked){
          this.rolesArray.push(e.target.value);
      }
      else{
          let i:number = 0;
          for(i; i < this.rolesArray.length; i++){
              if(this.rolesArray[i] == e.target.value){
                  this.rolesArray.splice(i,1);
              }
          }
      }
      this.updateArray = this.rolesArray;
      console.log("updateArray data => "+this.updateArray);
      if(this.rolesArray.length == 0) {
        this.roleError = true;
      }
      else{
        this.roleError = false;
      }
  }

  cancel(){
      this.updateUser.disable();
      this.router.navigate(['admin/usermanager-list']);
  }
  
  onSubmit() {
      
        this.submitted = true;
        console.log("controls");  
        console.log(this.updateUser.value);
  
        if (this.updateUser.invalid)
        return Swal.fire({
            icon: "error",
            text: "Please enter all fields!",
        });

      if(this.rolesArray.length <= 0)
      {
          this.roleError = true;
          return;
      }
      else
      {
          this.spinner.show();
          this.updateUser.value.roles = this.rolesArray;
          this.addUserService.updateUser(this.updateUser.value).subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                this.toastr.error(res.data);
                this.spinner.hide();
              }
              else if(res.status === "1"){
                this.spinner.hide();
                this.toastr.success(res.data);
                this.updateUser.reset();
                this.submitted = false;
                this.spinner.hide();
                this.router.navigate(['admin/usermanager-list']);
              }
            },
            error:(err)=>{
                this.errormsg = err.error.data;
                this.spinner.hide();
                this.toastr.error(err.error.data, "", {
                    progressBar: true,
                });
            }
          })
      }

        
      
  }

}
