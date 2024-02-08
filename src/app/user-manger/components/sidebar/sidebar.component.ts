import { Component, Output, EventEmitter, OnInit, Input } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { UserService } from "src/app/_services/user.service";
import { Login } from "src/app/auth_models/login.model";
@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
    isActive: boolean;
    collapsed: boolean;
    showMenu: string;
    pushRightClass: string;
    users: UserService[];
    login: Login[] = [];
    username: any = "";
    showUpdate: any;
    @Input() receivedProfile: boolean;
    @Output() collapsedEvent = new EventEmitter<boolean>();
    constructor(
        private translate: TranslateService,
        public router: Router,
        private route: ActivatedRoute
    ) {
        this.router.events.subscribe((val) => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        // this.username = JSON.parse(localStorage.getItem("currentUser"));
        this.isActive = false;
        this.collapsed = false;
        this.showMenu = "";
        this.pushRightClass = "push-right";
        this.username = JSON.parse(localStorage.getItem("currentUser"));
    }

    eventCalled() {
        this.isActive = !this.isActive;
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = "0";
        } else {
            this.showMenu = element;
        }
    }
    showInv(element: any) {
        if (element === this.showMenu) {
            this.showMenu = "0";
        } else {
            this.showMenu = element;
        }
    }
    showShifts(element: any) {
        if (element === this.showMenu) {
            this.showMenu = "0";
        } else {
            this.showMenu = element;
        }
    }

    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector("body");
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector("body");
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector("body");
        dom.classList.toggle("rtl");
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onLoggedout() {
        localStorage.removeItem("isLoggedin");
    }
}
