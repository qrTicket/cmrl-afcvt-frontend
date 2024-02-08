import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-super',
    templateUrl: './super.component.html',
    styleUrls: ['./super.component.scss']
})
export class SuperComponent implements OnInit {
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
