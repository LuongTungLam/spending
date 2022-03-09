import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SocialAuthService } from 'angularx-social-login';
import { tap } from 'rxjs/operators';
import * as AuthActions from '../actions/login-actions';

@Injectable()
export class RouteEffects {

  gotohome$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.loginSocicalSuccess, AuthActions.autoLogin),
      tap(() => this.route.navigate(['home']))
    ), { dispatch: false }
  );

  gotologin$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.route.navigate(['login']);
      })
    ), { dispatch: false }
  );

  autoLogout$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.autoLogout),
      tap((action) => {
        localStorage.removeItem('socicalUser');
        this.route.navigate(['login']);
      })
    ), { dispatch: false }
  );

  onReloadBrowser$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.browserReload),
      tap((actions) => {
        localStorage.setItem('socicalUser', JSON.stringify(actions.user));
        var date = new Date(actions.user.validTo);
        var now = new Date();

        setTimeout(() => {
          localStorage.removeItem('socicalUser');
          this.route.navigate(['login']);
        }, (date.getTime() - now.getTime()))
      })
    ), { dispatch: false }
  );

  constructor(private actions$: Actions, private route: Router) { }

}