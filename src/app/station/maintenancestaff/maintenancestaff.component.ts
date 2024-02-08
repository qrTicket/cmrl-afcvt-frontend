import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, FormControl } from '@angular/forms';
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

  addstaffForm: UntypedFormGroup;
  submitted = false;
  selectedFile: File;
  activeuserList: any = [];
  myarray: any=[];
  constructor(private mSservice: MaintenancestaffService, private activeuser: AtiveuserService, private formBuilder: UntypedFormBuilder,private router: Router,private toastr: ToastrService,  private http: HttpClient) { }

  ngOnInit() {

    this.addstaffForm = this.formBuilder.group({
      
      userId: ['', Validators.required],
      // equipmentIpAddress: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required]
     
    });

    this.activeuser.getactiveuser().subscribe(
      (data) => {
         
          this.activeuserList = data;
          console.log(data);
          this.myarray=data;
      },
      (error) => {
          console.log(error);
         
      }
  );

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
  this.mSservice.addmaintenancestaff(this.addstaffForm.value).subscribe(res => 
    {
       console.log(res, 'Response'); 
     
      //  console.log(this.addFrom.value);   
    });
  this.toastr.success('User Add Succeddfully', 'Success');
  
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