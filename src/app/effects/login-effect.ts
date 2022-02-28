import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SocialUser } from "angularx-social-login";
import { catchError, map, of, switchMap } from "rxjs";
import { login, loginFailed, loginSuccess } from "../actions/login-actions";
import { LoginService } from "../services/login-service";

@Injectable()
export class LoginEffect {
    constructor(private action$: Actions, private loginService: LoginService) { }

    login$ = createEffect(() => this.action$.pipe(
        ofType(login),
        switchMap(() => {
            return this.loginService.signInWithFB()
                .pipe(
                    map((user: SocialUser) => {
                        return loginSuccess({ user: user })
                    })
                )
        }), catchError(err => {
            return of(loginFailed({ error: err }))
        })
    ))
}