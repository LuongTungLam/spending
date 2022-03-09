import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of } from 'rxjs';
import { LoginService } from 'src/app/services/login-service';
import * as AuthActions from '../actions/login-actions';

@Injectable()
export class LoginEffects {

  socicalLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.loginSocical),
      concatMap((action) =>
        this.loginService.socicalLogin(action.provider, action.token).pipe(
          map(user => AuthActions.loginSocicalSuccess({ user: user })),
          catchError((error) => of(AuthActions.loginSocicalFailed({ error })))
        ))
    )
  })

  constructor(private actions$: Actions, private loginService: LoginService) { }

}
