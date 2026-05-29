import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { GuestUserService } from './guest-service.service';
import { GuestUser } from './guest-user.model';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,
    private guestUserService: GuestUserService,
    private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  isLoginMode = true;
  isLoading = false;
  error: string = null;
  isGuestMode = this.guestUserService.isGuest;

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){

    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isGuestMode){
      authObs = this.authService.guestLogin('robtrostle@yahoo.com', 'Hockey#17');
    }
    

    if(this.isLoginMode){
      authObs = this.authService.login(email, password);
    }else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(resData => {
      console.log(resData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    },
    errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.isLoading = false;
    }
    );
    form.reset();
  }

  onHandleError(){
    this.error = null;
  }

  signInAsGuest(): void {
    this.guestUserService.createGuestUser();
    this.isLoading = true;
    this.authService.guestLogin('robtrostle@yahoo.com', 'Hockey#17').subscribe(
      () => {
        this.dataStorageService.fetchRecipes().subscribe(() => {
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        });
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
        this.guestUserService.clearGuestUser();
      }
    );
  }

  signOut(): void {
    this.guestUserService.clearGuestUser();
    // Perform any additional actions needed for sign-out
    this.router.navigate(['/auth']);
    console.log('Signed out');
  }

  get currentGuestUser(): GuestUser | null {
    return this.guestUserService.getGuestUser();
  }
}
