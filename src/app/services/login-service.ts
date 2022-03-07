import { Injectable, OnInit } from '@angular/core';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { from, Observable } from 'rxjs';
import { SpendingdApi } from '../api/api';


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private authService: SocialAuthService, private api: SpendingdApi) { }

    signInWithFB(): Observable<SocialUser> {
        return from(this.authService.signIn(FacebookLoginProvider.PROVIDER_ID));
    }

    signInWithGG(): Observable<SocialUser> {
        return from(this.authService.signIn(GoogleLoginProvider.PROVIDER_ID));
    }

    signOut() {
        this.authService.signOut();
    }
}