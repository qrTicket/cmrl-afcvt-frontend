import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-equipment',
    templateUrl: './equipment.component.html',
    styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
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
