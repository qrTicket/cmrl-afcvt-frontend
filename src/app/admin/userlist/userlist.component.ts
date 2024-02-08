

import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { User } from '../_models/user.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})

export class UserlistComponent implements OnInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();

  user: any = [];
  public userData: Object;
  public temp: Object = false;
  searchTerm: any;
 

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private router: Router
  ) { }
  dtOptions: DataTables.Settings = {};


  ngOnInit() {
    this.userList();
  }

  userList() {
    this.userService.getUser().subscribe(data => {
      this.user = data;
      console.log(this.user);

      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true
      };
      this.dtTrigger.next(true);
    });
  }
  
}
