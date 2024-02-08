import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user.model';


@Component({
  selector: 'app-edit-usermanager',
  templateUrl: './edit-usermanager.component.html',
  styleUrls: ['./edit-usermanager.component.scss']
})
export class EditUsermanagerComponent implements OnInit {

  user: User;
  editusermanagerForm: UntypedFormGroup;
  submitted = false;
  id: number = null;

  successmsg;
  errormsg;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private userService: UserService
  ) { }

  ngOnInit() {

    this.editusermanagerForm = this.formBuilder.group({
      id: ["", RxwebValidators.required({ message: "Required!", }),],
      name: ["", RxwebValidators.required({ message: "Required!", }),],
      designation: ["", RxwebValidators.required({ message: "Required!", }),],
      empId: ["", RxwebValidators.required({ message: "Required!", }),],
      username: ["", RxwebValidators.required({ message: "Required!", }),],
      destination: ["", RxwebValidators.required({ message: "Required!", }),],
      contactNumber: ["", RxwebValidators.required({ message: "Required!", }),],
      email: ["", RxwebValidators.required({ message: "Required!", }),],
      address: ["", RxwebValidators.required({ message: "Required!", }),],
      createdDate: ["", RxwebValidators.required({ message: "Required!", }),]
    });

    this.activeRouter.paramMap.subscribe((params) => {
      const id = +params.get("id");
      if (id) {
        this.getUser(id);
      }
    });

  }

  
  getUser(id) {
    this.userService.getUserById(id)
      .subscribe(
        (user: User) => this.updateUser(user),
        (error: any) => console.log(error)
      );

  }
  updateUser(user: User) {
    this.editusermanagerForm.patchValue({
      id: user.id,
      name: user.name,
      designation: user.designation,
      empId: user.empId,
      username: user.username,
      contactNumber: user.contactNumber,
      email: user.email,
      address: user.address,
      createdDate: user.createdDate
    });
  }

  get fval() {
    return this.editusermanagerForm.controls;
  }

  onFormSubmit() {
    this.submitted = true;
    //if (this.editusermanagerForm.invalid)
     // return this.toastr.error("Unable to update form: please check all the details", "Error");
    console.log(this.editusermanagerForm.value);
    this.userService
      .putUser(this.editusermanagerForm.value.id, this.editusermanagerForm.value)
      .subscribe((res) => {
        this.successmsg = res;
        this.toastr.success("", this.successmsg.message);
      },
        (error) => {
          console.log(error);
          this.errormsg = error;
          this.toastr.error("", this.errormsg);
        }
      );
    this.editusermanagerForm.reset();
    this.submitted = false;
    this.router.navigate(['admin/userlist']);
  }


}
