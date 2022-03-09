import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/login-actions';
import { User } from './user';


export const loginFeatureKey = 'login';

export interface State {
  user: User,
  error: any
}

export const initialState: State = {
  user: {
    id: '',
    avatar: '',
    description: '',
    email: '',
    fullName: '',
    isAuthenticated: false,
    token: '',
    validTo: ''
  },
  error: null
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.loginSocicalSuccess, AuthActions.browserReload, (state, Action) => {
    return {
      ...state,
      user: Action.user,
      error: null
    }
  }),
  on(AuthActions.loginSocicalFailed, (state, action) => {
    return {
      ...state,
      user: {
        id: '',
        avatar: '',
        description: '',
        email: '',
        fullName: '',
        isAuthenticated: false,
        token: '',
        validTo: ''
      },
      error: action.error
    }
  }),
  on(AuthActions.logout, AuthActions.autoLogout, (state, action) => {
    return {
      ...state,
      user: {
        id: '',
        avatar: '',
        description: '',
        email: '',
        fullName: '',
        isAuthenticated: false,
        token: '',
        validTo: ''
      },
      error: null
    }
  })
);
