// guest-user.service.ts
import { Injectable } from '@angular/core';
import { GuestUser } from './guest-user.model';

@Injectable({
  providedIn: 'root',
})
export class GuestUserService {

  private guestUser: GuestUser | null = null;

  isGuest: boolean = false;

  createGuestUser(): GuestUser {
    // Generate a unique ID for the guest user
    const password = 'Hockey#17';

    // Create the guest user object
    this.guestUser = { password, email: 'robtrostle@yahoo.com' };
    this.isGuest = true;
    return this.guestUser;
  }

  getGuestUser(): GuestUser | null {
    return this.guestUser;
  }

  clearGuestUser(): void {
    this.guestUser = null;
  }
}
