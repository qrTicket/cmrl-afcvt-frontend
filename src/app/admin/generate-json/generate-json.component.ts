import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { JsonService } from '../_services/json.service';
import { ToastrService } from 'ngx-toastr';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-generate-json',
  templateUrl: './generate-json.component.html',
  styleUrls: ['./generate-json.component.scss']
})
export class GenerateJsonComponent implements OnInit {
  listOfFiles:any[]=[];
  public temp: Object = false;
  datePickerChange: Partial<BsDatepickerConfig>;
  maxDate:Date;
  GenerateFile:FormGroup;
  modalRef: BsModalRef;
  config = {
    animated: true,
    backdrop: true,
    ignoreBackdropClick: false,
  };
  submitted:boolean = false;
  fileId:number;

  constructor(
    private jsonSrv:JsonService,
    private toaster: ToastrService,
    private fb:FormBuilder,
    private modalSrv:BsModalService
  ) {
    this.datePickerChange = Object.assign(
      {},
      {
          adaptivePosition: true,
          dateInputFormat: "DD-MM-YYYY",
          containerClass: "theme-dark-blue",
          minDate: (this.maxDate = new Date()),
      }
    );
   }

  ngOnInit(): void {
    this.GenerateFile = this.fb.group({
      activationDate:['', [RxwebValidators.required({message:"ERROR! This field is required!"})]]
    })

    this.getListOfCreatedFiles();
  }

  get fval() {
    return this.GenerateFile.controls;
  }

  getListOfCreatedFiles() {
    this.jsonSrv.getGeneratedFiles().subscribe({
      next:(res)=>{
        if(res.status === "0"){
          this.toaster.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.listOfFiles = res.data;
          this.temp = true;
          console.log(this.listOfFiles,'this.listOfFiles')
        }
      },
      error:(err)=>{
        this.toaster.error(err.error.data,'Error!')
      }
    })    
  }

  openModal(templateFileGeneration: TemplateRef<any>, id:any) {
    this.fileId = id;
    this.submitted = false;
    this.modalRef = this.modalSrv.show(templateFileGeneration, this.config);
  }

  decline() {
    this.modalRef.hide();
    this.GenerateFile.reset();
    this.submitted = false;
  }



  generateFile(){
    if(this.GenerateFile.invalid){
      this.submitted = true;
      return false;
    }

    let reqObj = [{
      "fileId" : this.fileId,
      "activationDate" : formatDate(this.GenerateFile.value.activationDate,'dd-MM-yyyy','en') 
    }]

    console.log(reqObj,'reqObj')

    this.jsonSrv.generateFiles(reqObj).subscribe({
      next:(res)=>{
        if(res.status === "0"){
          this.toaster.error(res.data,'Error!')
        }
        else if(res.status === "1"){
          this.toaster.success(res.data,'Success!')
          this.decline();
        }
      },
      error:(err)=>{
        this.toaster.error(err.error.data,'Error!')
      }
    }) 
  }

}
