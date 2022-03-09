import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromLogin from './reducers/login.reducer';
import * as fromRouter from '@ngrx/router-store';

export interface AppState {

  [fromLogin.loginFeatureKey]: fromLogin.State;

  // router: fromRouter.RouterReducerState;
}

export const reducers: ActionReducerMap<AppState> = {

  [fromLogin.loginFeatureKey]: fromLogin.reducer,

  // router: fromRouter.routerReducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
