import { Injectable } from "@angular/core";
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
} from "@angular/router";
import { AuthService } from "./auth.service";
import { ToastrService } from "ngx-toastr";
import * as decode from "jwt-decode";

@Injectable({
    providedIn: "root",
})
export class RoleGuardService implements CanActivate {
    constructor(
        public auth: AuthService,
        public router: Router,
        private toastr: ToastrService
    ) {}
    canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
        let expectedRoleArray = route.data;
        // console.log(expectedRoleArray);

        expectedRoleArray = expectedRoleArray.expectedRole;
        //let expectedRole = expectedRoleArray[0];
        // console.log(expectedRoleArray[0], "Expected");

        const role = localStorage.getItem("Roles");

        // decode the token to get its payload
        //const tokenPayload = decode(token);
        let userRole = JSON.parse(role);
        // console.log(JSON.parse(role), "Roles");

        let expectedRole = "";

        for (let i = 0; i <= expectedRoleArray.length; i++) {
            if (expectedRoleArray[i] === userRole) {
                // console.log('Roles Matched');
                expectedRole = userRole;
                // console.log(expectedRole, "Expected");
            }
        }

        if (userRole === expectedRole) {
            return true;
        }
        this.toastr.error("Access Denied", "Unauthorised");
        // return this.router.createUrlTree(["/access-denied"]);

        this.router.navigate(["/login"]);
    }
}
