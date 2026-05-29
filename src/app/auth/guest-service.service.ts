// guest-user.service.ts
import { Injectable } from '@angular/core';
import { GuestUser } from './guest-user.model';

@Injectable({
  providedIn: 'root',
})
export class GuestUserService {

  private guestUser: GuestUser | null = null;

  get isGuest(): boolean {
    return localStorage.getItem('isGuest') === 'true';
  }

  createGuestUser(): GuestUser {
    this.guestUser = { password: 'Hockey#17', email: 'robtrostle@yahoo.com' };
    localStorage.setItem('isGuest', 'true');
    return this.guestUser;
  }

  getGuestUser(): GuestUser | null {
    return this.guestUser;
  }

  clearGuestUser(): void {
    this.guestUser = null;
    localStorage.removeItem('isGuest');
  }
}
