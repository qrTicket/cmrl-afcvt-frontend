import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../../_services/user.service';
import { AuthService } from '../../../_services/auth.service';
import { Login } from '../../../auth_models/login.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Output() collapsedEvent = new EventEmitter<boolean>();
    collapsed: boolean;
    public pushRightClass: string;
    // users: UserService[];
    // login: Login[] = [];
    username: any = '';
    profile: boolean = false;


    constructor(private translate: TranslateService,
         public router: Router,
         private authService: AuthService,
         private userService: UserService
         ) {

        this.router.events.subscribe(val => {
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
         this.username = JSON.parse(localStorage.getItem('currentUser'));
        this.pushRightClass = 'push-right';
        this.collapsed = false;
    }
    toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.collapsedEvent.emit(this.collapsed);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        this.authService.logout();
        this.router.navigate(['/login']);
        // localStorage.removeItem('isLoggedin');
    }

    // changeLang(language: string) {
    //     this.translate.use(language);
    // }

    onProfileClick(){
        this.router.navigate(['/super-admin/profile/edit']);
        this.profile = true;
    }
    onPrivacy(){
        this.router.navigate(['/super-admin/privacy'])
    }
}
