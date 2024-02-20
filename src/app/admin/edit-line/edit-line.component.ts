import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";
import { Router, ActivatedRoute } from "@angular/router";
import { Line } from "../_models/lines.model";
import { LinesService } from "../_services/lines.service";
import { NgxSpinnerService } from "ngx-spinner";
import { RxwebValidators } from "@rxweb/reactive-form-validators";

@Component({
    selector: "app-edit-line",
    templateUrl: "./edit-line.component.html",
    styleUrls: ["./edit-line.component.scss"],
})
export class EditLineComponent implements OnInit {
    line: Line;
    editlineForm: FormGroup;
    submitted = false;
    isDisabled: boolean = true;
    successmsg;
    errormsg;
    spinners = false;
    lineId: number;

    constructor(
        private linesService: LinesService,
        private formBuilder: FormBuilder,
        private router: Router,
        private activeRouter: ActivatedRoute,
        private toastr: ToastrService,
        private spinner: NgxSpinnerService
    ) {}

    ngOnInit() {
        this.editlineForm = this.formBuilder.group({
            id: ["", RxwebValidators.required({ message: "Required!" })],
            lineName: [
                "",
                [
                    RxwebValidators.required({ message: "Required!" }),
                    RxwebValidators.alpha({
                        message: "This will accept only alphabet!",
                        allowWhiteSpace: true,
                    }),
                    RxwebValidators.minLength({
                        value: 3,
                        message: "Minimum length should be 3!",
                    }),
                ],
            ],
            lineCode: [
                "",
                [
                    RxwebValidators.required({ message: "Required!" }),
                    RxwebValidators.pattern({
                        expression: {
                            alpha: /^[a-zA-Z][a-zA-Z0-9\s]*$/,
                        },
                        message:
                            "This accept combination of numbers and alphabets.",
                    }),
                    RxwebValidators.minLength({
                        value: 3,
                        message: "Minimum length should be 3!",
                    }),
                ],
            ],
            /*source: [
                "",
                [
                    RxwebValidators.required({ message: "Required!" }),
                    RxwebValidators.pattern({
                        expression: {
                            alpha: /^[a-zA-Z][a-zA-Z0-9\s]*$/,
                        },
                        message:
                            "This accept combination of numbers and alphabets.",
                    }),
                ],
            ],*/
            /*destination: [
                "",
                [
                    RxwebValidators.required({ message: "Required!" }),
                    RxwebValidators.pattern({
                        expression: {
                            alpha: /^[a-zA-Z][a-zA-Z0-9\s]*$/,
                        },
                        message:
                            "This accept combination of numbers and alphabets.",
                    }),
                ],
            ],*/
        });

        // this.linesService.getLines().subscribe((res) => {
        //     this.line = res["data"];
        // });
        this.linesService.getLines().subscribe({
            next:(res)=>{
              if(res.status === "0"){
                  this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.line = res.data;
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })

        this.activeRouter.paramMap.subscribe((params) => {
            this.lineId = +params.get("id");
            if (this.lineId) {
                this.getLine(this.lineId);
            }
        });
    }

    get fval() {
        return this.editlineForm.controls;
    }

    getLine(id: number) {
        // this.linesService.getLineById(id).subscribe((line: Line) => {
        //     this.updateLine(line["data"]);
        // }),
        //     (error: any) => {
        //     };

            this.linesService.getLineById(id).subscribe({
                next:(res:any)=>{
                  if(res.status === "0"){
                      this.toastr.error(res.data,'Error!')
                  }
                  else if(res.status === "1"){
                    this.updateLine(res.data);
                  }
                },
                error:(err)=>{
                    this.toastr.error(err.error.data,'Error!')
                }
              })
    }
    updateLine(line: Line) {
        this.editlineForm.patchValue({
            id: line.id,
            lineName: line.lineName,
            lineCode: line.lineCode,
            // source: line.source,
            // destination: line.destination,
        });
    }

    onFormSubmit() {
        this.submitted = true;
        //console.log(this.editlineForm.value)
        if (this.editlineForm.invalid)
            return Swal.fire({
                icon: "error",
                title: "Error!",
                text: "Please fill all fields!",
            });
        // this.linesService.putLine(this.editlineForm.value).subscribe(
        //     (data) => {
        //         console.log(data);
        //         if (data["status"] === "1") {
        //             this.spinner.hide();
        //             this.successmsg = data;
        //             this.toastr.success("", this.successmsg.data);
        //             this.router.navigate(["/admin/linelist"]);
        //             this.editlineForm.reset();
        //             this.submitted = false;
        //         } else {
        //             Swal.fire({
        //                 title: "Error !",
        //                 text: data["data"],
        //             });
        //         }
        //     },
        //     (error) => {
        //         this.errormsg = error;
        //         Swal.fire({
        //             title: "Error !",
        //             text: this.errormsg.data,
        //         });
        //     }
        // );

        this.linesService.putLine(this.editlineForm.value).subscribe({
            next:(res:any)=>{
              if(res.status === "0"){
                  this.toastr.error(res.data,'Error!')
              }
              else if(res.status === "1"){
                this.spinner.hide();
                    this.successmsg = res.data;
                    this.toastr.success("", this.successmsg.data);
                    this.router.navigate(["/admin/linelist"]);
                    this.editlineForm.reset();
                    this.submitted = false;
              }
            },
            error:(err)=>{
                this.toastr.error(err.error.data,'Error!')
            }
          })
    }
}
