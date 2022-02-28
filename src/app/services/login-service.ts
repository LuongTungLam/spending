import { Injectable } from '@angular/core';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { from, Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private authService: SocialAuthService) { }

    signInWithFB(): Observable<SocialUser> {
        return from(this.authService.signIn(FacebookLoginProvider.PROVIDER_ID));
    }

    signOut() {
        this.authService.signOut();
    }
}