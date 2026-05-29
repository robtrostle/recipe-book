import { Injectable } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { GuestUserService } from "./guest-service.service";

@Injectable({ providedIn: "root" })
export class NoGuestGuard {

  constructor(private guestUserService: GuestUserService, private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.guestUserService.isGuest) {
      return this.router.createUrlTree(['/recipes']);
    }
    return true;
  }
}
