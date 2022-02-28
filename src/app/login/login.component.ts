import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacebookLoginProvider, SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  registerForm = false;
  constructor(private router: Router, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      console.log(user);
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

    console.log(this.socialAuthService);
    
  }
}
