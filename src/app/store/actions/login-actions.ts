import { createAction, props } from '@ngrx/store';
import { User } from '../reducers/user';

export const loginSocical = createAction('[Login Page] Login User', props<{ provider: string, token: string }>());

export const loginSocicalSuccess = createAction('[Auth Effect] Login User Success', props<{ user: User }>());

export const loginSocicalFailed = createAction('[Auth Effect] Login User Failed', props<{ error: any }>());

export const logout = createAction('[Auth Effect] Logout User');

export const browserReload = createAction('[Reload Browser Effect] Reload Browser', props<{ user: User }>());

export const autoLogout = createAction('[Auto Logout Effect] Auto Logout', props<{ user: User }>());

export const autoLogin = createAction('[Auto Login Effect] Auto Login Success', props<{ user: User }>());
