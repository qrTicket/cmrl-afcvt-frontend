import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.scss']
})
export class ComplaintComponent implements OnInit {
collapedSideBar: boolean;

  constructor(private router: Router) {}

  ngOnInit() {}

  receiveCollapsed($event) {
      this.collapedSideBar = $event;
  }
  Logout() {
      localStorage.removeItem('userToken');
      this.router.navigate(['/login']);
    }
}
