import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import Swal from 'sweetalert2';
import { CsvFileService } from '../_services/csv-file.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-o-d-matrix',
  templateUrl: './upload-o-d-matrix.component.html',
  styleUrls: ['./upload-o-d-matrix.component.scss']
})
export class UploadODMatrixComponent implements OnInit {
  uploadFileForm: FormGroup;
  submit = false;
  fileToUpload:any;

  constructor(
    private formBuilder: FormBuilder,
    private csvService:CsvFileService,
    private toastr:ToastrService,
    private route:Router,
  ) { }

  ngOnInit(): void {
    this.uploadFileForm = this.formBuilder.group({
      file: ["", RxwebValidators.required({ message: "Please select file!"})]
    });
  }

  get fval(){
    return this.uploadFileForm.controls;
  }

  uploadFile(e) {
    console.log(e);
    
    if (e.target.files.length > 0) {
      this.fileToUpload = e.target.files[0] ;
    }
  }

  onSubmit(){
    
    if (this.uploadFileForm.invalid){
      this.submit = true;
      return;
    }

    this.csvService.uploadOdMatrix(this.fileToUpload)
    .subscribe({
      next:(response:any)=>{
        if(response['status'] === "1") this.toastr.success(response.data);
        this.submit = false;
        this.route.navigate(['/admin/admindashboard'])
      },
      error:(err:any)=>{
        this.toastr.error(err.error.data)
      }
    })
  }

}
