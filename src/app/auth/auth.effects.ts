import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { Login, AuthActionTypes, Logout } from './auth.actions';
import { tap } from 'rxjs/internal/operators/tap';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { Router } from '@angular/router';
import { defer } from 'rxjs/internal/observable/defer';
import { of } from 'rxjs/internal/observable/of';


@Injectable()
export class AuthEffects {

  @Effect({dispatch:false}) /* Não esta alterando nada no banco */
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action => localStorage.setItem("user", JSON.stringify(action.payload.user)))
  );

  @Effect({dispatch:false})
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    tap(() => {
      localStorage.removeItem("user")
      this.router.navigateByUrl('/login');
    })
  );
  
  @Effect()
  init$ = defer<Login | Logout>(() => {
    const userData= localStorage.getItem("user");

    if (userData) {
      return of(new Login(JSON.parse(userData)));
    } else {
      return of(new Logout());
    }
  });

  constructor(private actions$: Actions, private router: Router) {}
}
