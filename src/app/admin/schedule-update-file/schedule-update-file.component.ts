import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
//import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { UploadFileService } from '../_services/upload-file.service';

@Component({
  selector: 'app-schedule-update-file',
  templateUrl: './schedule-update-file.component.html',
  styleUrls: ['./schedule-update-file.component.scss']
})
export class ScheduleUpdateFileComponent implements OnInit {

  scheduleFileForm : UntypedFormGroup;
  submitted = false;
  fileToUpload: File = null;


  constructor(
    private formBuilder: UntypedFormBuilder,
    private toastr: ToastrService,
    private uploadfileservice: UploadFileService,
  ) { }

  ngOnInit() {

    this.scheduleFileForm = this.formBuilder.group({
      scheduledate: [
        "",
        RxwebValidators.required({
          message: "please select date!",
        }),
      ],
      scheduletime: [
        "",
        RxwebValidators.required({
          message: "please select time!",
        }),
      ],
      file: [
        "",
        RxwebValidators.required({
          message: "please select file!",
        }),
      ],
    });

    //console.log(this.scheduleFileForm.controls);
  }

  get fval(){
      return this.scheduleFileForm.controls;
  }


  uploadFile(e) {
    if (e.target.files.length > 0) {
      this.fileToUpload = e.target.files[0];
      // console.log(this.fileToUpload);
      this.scheduleFileForm.get("file").setValue(this.fileToUpload);
    }
  }

  onSubmit() {

    console.log(this.scheduleFileForm.controls)
    this.submitted = true;
    if (this.scheduleFileForm.invalid){
      //return swal("Please select file!", "", "error");
      return Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Please select file!",
      });
    }
      

    console.log(this.scheduleFileForm.value);

    this.uploadfileservice.scheduleFileUpload(this.scheduleFileForm.value).subscribe(
      (res) => {
        if (res.status === "0") {
          //return swal(res.data, "", "error");
          return Swal.fire({
            icon: "error",
            title: "ERROR",
            text: res.data,
          });
        }
        // this.uploadResponse = res;
        // this.toastr.success("",
        //   this.uploadResponse.data
        // );
      },
      (error) => {
        if (error.status === "1") {
          //return swal(error.data, "", "error");
          return Swal.fire({
            icon: "error",
            title: "ERROR",
            text: error.data,
          });
        }
        // this.error = error;
        // this.toastr.warning("",
        //   this.uploadResponse.data
        // );
      }
    );
    this.scheduleFileForm.reset();
    this.submitted = false;
  }

}
