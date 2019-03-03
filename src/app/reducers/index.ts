import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { User } from '../model/user.model';
import { AuthActionTypes } from '../auth/auth.actions';

/* Criação dos objetos a serem mantidos */
type AuthState = {
  loggedIn: boolean,
  user: User
}
/* Fim Criação dos objetos */

const initialAuthState: AuthState = {
  loggedIn: false,
  user: undefined
}

export interface AppState {
  /* Criação dos objetos a serem mantidos */
  auth: AuthState
  /* Fim Criação dos objetos */
}

function authReducer(state: AuthState = initialAuthState, action): AuthState {
  switch (action.type) {

    case AuthActionTypes.LoginAction:
      return {
        loggedIn: true,
        user: action.payload.user
      }

    default:
      return state;  
  }
}

/* Ações que faram alterações em store */
export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer /* Para este objeto faça uso desta função */
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
