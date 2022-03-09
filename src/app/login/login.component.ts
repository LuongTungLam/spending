import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import * as AuthActions from '../store/actions/login-actions';
import { SpendingApi } from '../api/api';
import { AppState } from '../store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any;
  loggedIn = false;
  registerForm = false;
  constructor(private router: Router, private socialAuthService: SocialAuthService, private api: SpendingApi, private store: Store<AppState>, private route: Router) { }

  ngOnInit(): void {
    // this.autoLogin();
  }

  autoLogin() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (this.loggedIn) {
        this.store.dispatch(AuthActions.loginSocical({ provider: user.provider, token: user.idToken }))
      }
    });
  }

  onLogout() {
    this.socialAuthService.signOut();
  }

  onLogin() {
    this.router.navigate(['home']);
  }

  onChangeRegister() {
    this.registerForm = true;
  }

  onBack() {
    this.registerForm = false;
  }

  onRegister() {
    this.registerForm = false;
  }

  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  loginWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.autoLogin();
  }
}
