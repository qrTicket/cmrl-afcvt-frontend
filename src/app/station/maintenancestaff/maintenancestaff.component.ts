import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {MaintenancestaffService } from '../_services/maintenancestaff.service';
import {AtiveuserService} from '../_services/ativeuser.service';
@Component({
  selector: 'app-maintenancestaff',
  templateUrl: './maintenancestaff.component.html',
  styleUrls: ['./maintenancestaff.component.scss']
})
export class MaintenancestaffComponent implements OnInit {

  addstaffForm: FormGroup;
  submitted = false;
  selectedFile: File;
  activeuserList: any = [];
  myarray: any=[];
  constructor(private mSservice: MaintenancestaffService, 
    private activeuser: AtiveuserService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,  
    private http: HttpClient) { }

  ngOnInit() {

    this.addstaffForm = this.formBuilder.group({
      
      userId: ['', Validators.required],
      // equipmentIpAddress: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required]
     
    });

  //   this.activeuser.getactiveuser().subscribe(
  //     (data) => {
         
  //         this.activeuserList = data;
  //         console.log(data);
  //         this.myarray=data;
  //     },
  //     (error) => {
  //         console.log(error);
         
  //     }
  // );
  this.activeuser.getactiveuser().subscribe({
    next:(res)=>{
      if(res.status === "0"){
          this.toastr.error(res.data,'Error!')
      }
      else if(res.status === "1"){
        this.activeuserList = res.data;
        console.log(res.data);
        this.myarray=res.data;
      }
    },
    error:(err)=>{
        this.toastr.error(err.error.data,'Error!')
    }
  })

}

get fval() {
  return this.addstaffForm.controls;
}

onFormSubmit() {
  this.submitted = true;
  console.log('form submit clicked..');
  if (this.addstaffForm.invalid) {
      return this.toastr.error('Invalid Form', 'Error');
  }
  // this.mSservice.addmaintenancestaff(this.addstaffForm.value).subscribe(res => 
  //   {
  //     console.log(res, 'Response');    
  //   });
  // this.toastr.success('User Add Succeddfully', 'Success');

  this.mSservice.addmaintenancestaff(this.addstaffForm.value).subscribe({
    next:(res)=>{
      if(res.status === "0"){
          this.toastr.error(res.data,'Error!')
      }
      else if(res.status === "1"){
        this.toastr.success('User Add Succeddfully', 'Success');
      }
    },
    error:(err)=>{
        this.toastr.error(err.error.data,'Error!')
    }
  })
  
  // this.configForm.reset();
}

passStrength(value:string,lbl:string, user:string, email:string)
{
  var result = value.replace(": Object", "");

  var obj = this.myarray;
  for(var i=0; i<obj.length; i++){
  
    if(obj[i].id==result){
    
     $("#"+lbl).val(obj[i].name);
     $("#"+user).val(obj[i].username);
     $("#"+email).val(obj[i].email);
    }
  }
  console.log(obj);
 
}


}