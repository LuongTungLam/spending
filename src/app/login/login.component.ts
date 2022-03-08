import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { SpendingApi } from '../api/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user!: SocialUser;
  loggedIn = false;
  registerForm = false;
  constructor(private router: Router, private socialAuthService: SocialAuthService, private api: SpendingApi) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (this.loggedIn) {
        this.api.externalLogin(user.provider, user.idToken).subscribe((rs => {
          console.log(rs);
        }));
        localStorage.setItem('socicalUser', JSON.stringify(this.user));
        this.router.navigate(['home']);
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
  }
}
