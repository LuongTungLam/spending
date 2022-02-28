import { SocialUser } from "angularx-social-login";
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/login-actions';

export interface State {
    user: SocialUser,
    error: any
}

export const initialState: State = {
    user: new SocialUser,
    error: null,
}

export const reducer = createReducer(
    initialState,
    on(AuthActions.loginSuccess, (state, action) => {
        return {
            ...state,
            user: action.user,
            error: null
        };
    }),
    on(AuthActions.loginFailed, (state, action) => {
        return {
            ...state,
            user: new SocialUser,
            error: action.error
        }
    })
)