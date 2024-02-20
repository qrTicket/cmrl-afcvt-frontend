import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-main-comp",
    templateUrl: "./main-comp.component.html",
    styleUrls: ["./main-comp.component.scss"]
})
export class MainCompComponent implements OnInit {
    navbarOpen = false;

    toggleNavbar() {
        this.navbarOpen = !this.navbarOpen;
    }

    constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        console.log("main component loaded");
    }

    register() {
        this.router.navigate(["home"], {
            queryParams: { mode: "write", register: "new  pto registration" }
        });
    }
    login(){
      this.router.navigate(["login"], {
        queryParams: { mode: "write", login: "login pto" } 
    });
    }
}
