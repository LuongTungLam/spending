import { Injectable } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { SpendingApi } from '../api/api';


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    constructor(private authService: SocialAuthService, private api: SpendingApi) { }

    socicalLogin(provider: string, token: string): Observable<any> {
        return this.api.externalLogin(provider, token);

    }

    signOut() {
        this.authService.signOut();
    }
}
