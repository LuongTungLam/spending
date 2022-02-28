import { createAction, props } from '@ngrx/store';
import { SocialUser } from 'angularx-social-login';

export const login = createAction('[LoginComponent] Login User');

export const loginSuccess = createAction('[Auth Effect] Login User Success', props<{ user: SocialUser }>());

export const loginFailed = createAction('[Auth Effect] Login User Failed', props<{ error: any }>());