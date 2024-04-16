import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";
import { GuestUserService } from "./guest-service.service";

@Injectable({ providedIn: "root" })
export class AuthGuard  {

    constructor(private authService: AuthService, private router: Router,
        private guestUserService: GuestUserService) {}
    
    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {

        const isGuest = this.guestUserService.getGuestUser() !== null;
    
        if (isGuest) {
            return this.authService.user.pipe(
                take(1),
                map(user => {
            const isAuth = !!user
            if(isAuth) {
                return true;
            } // Allow access for guest users
        }))}


        return this.authService.user.pipe(
            take(1),
            map(user => {
        const isAuth = !!user
        if(isAuth) {
            return true;
        }
        return this.router.createUrlTree(['/auth']);
    }));
    }

    canActivateGuest(): boolean {
        const isGuest = this.guestUserService.getGuestUser() !== null;
    
        if (isGuest) {
          return true; // Allow access for guest users
        } else {
          this.router.navigate(['/auth']); // Redirect to the login page for non-guest users
          return false;
        }
      }
}