import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { UploadFileService } from "../_services/upload-file.service";
import { RxwebValidators } from '@rxweb/reactive-form-validators';
//import swal from 'sweetalert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-penality',
  templateUrl: './penality.component.html',
  styleUrls: ['./penality.component.scss']
})
export class PenalityComponent implements OnInit {

  successmsg;
  errormsg;

  uploadFileForm: UntypedFormGroup;
  submit = false;
  fileToUpload: File = null;
  error: string;
  uploadResponse = { status: "", filePath: "", data: "" };

  constructor(
    private uploadfileservice: UploadFileService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.uploadFileForm = this.formBuilder.group({
      file: [
        "",
        RxwebValidators.required({
          message: "please select file!",
        }),
      ],
    });
  }

  uploadPenality(e) {
    if (e.target.files.length > 0) {
      this.fileToUpload = e.target.files[0];
      // console.log(this.fileToUpload);
      this.uploadFileForm.get("file").setValue(this.fileToUpload);
    }
  }

  onSubmit() {
    this.submit = true;
    if (this.uploadFileForm.invalid){
      //return swal("Please select file!", "", "error");
      return Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Please select file!",
      });
    }
      

    this.uploadfileservice.penalityFileUpload(this.fileToUpload).subscribe(
      (res) => {
        if (res.status === "0") {
          //return swal(res.data, "", "error");
          return Swal.fire({
            icon: "error",
            title: "ERROR",
            text: res.data,
          });
        }
        this.uploadResponse = res;
        this.toastr.success("",
          this.uploadResponse.data
        );
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
        this.error = error;
        this.toastr.warning("",
          this.uploadResponse.data
        );
      }
    );
    this.uploadFileForm.reset();
    this.submit = false;
  }

}
