import { Injectable } from '@angular/core';
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthService,
        private toastr: ToastrService
    ) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree {
        const isLogin = this.authenticationService.isLogin();
        const roles = route.data.expectedRole;
        if (isLogin) {
            return true;
        }
        this.toastr.warning('Unauthorised Access', 'Login First');
        return this.router.createUrlTree(['/login']);
        // return this.chekUser(route, state);
    }
    // canActivateChild(
    //     route: ActivatedRouteSnapshot,
    //     state: RouterStateSnapshot
    // ): boolean {
    //     //return this.chekUser(route, state);
    // }
    // private chekUser(route, state): boolean {
    //   const userType = this.authenticationService.getUserType();
    //   const isLogin = this.authenticationService.isLogin();
    //   // userType === 'client' &&
    //   if (isLogin) {
    //     return true;
    //   } else if (isLogin) {
    //       this.toastr.showError();
    //     this.router.navigate(['/login']);
    //     this.router.navigateByUrl('/auth/403');
    //     return false;
    //   } else {
    //     // this.logger.log('Not authenticated, redirecting...');
    //     this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    //     return false;
    //   }
    // }
    // const currentUser = this.authenticationService.currentUserValue;
    // if (currentUser) {
    //     //check if route is restricted by roles
    //     if (
    //         route.data.roles &&
    //         route.data.roles.indexOf(currentUser.role) === -1
    //     ) {
    //         //navigate to home page
    //         this.router.navigate(["/"]);
    //         return false;
    //     }
    //     // logged in so return true
    //     return true;
    // }
    // // not logged in so redirect to login page with the return url
    // this.router.navigate(["/"], { queryParams: { returnUrl: state.url } });
    // return false;
}
