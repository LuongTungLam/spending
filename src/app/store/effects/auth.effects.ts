import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SocialAuthService } from 'angularx-social-login';
import { tap } from 'rxjs/operators';
import * as AuthActions from '../actions/login-actions';



@Injectable()
export class AuthEffects {
  addUserToLocalStorage$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.loginSocicalSuccess),
      tap((actions) => {
        localStorage.setItem('socicalUser', JSON.stringify(actions.user));
        this.socialAuthService.signOut();
        var date = new Date(actions.user.validTo);
        var now = new Date();

        setTimeout(() => {
          localStorage.removeItem('socicalUser');
          this.route.navigate(['login']);
        }, (date.getTime() - now.getTime()))
      })
    ), { dispatch: false }
  );

  removeUserToLocalStorage$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => localStorage.removeItem('socicalUser'))
    ), { dispatch: false }
  );

  constructor(private actions$: Actions, private socialAuthService: SocialAuthService, private route: Router) { }

}
