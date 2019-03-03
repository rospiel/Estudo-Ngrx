import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { Store, select } from "@ngrx/store";
import { AppState } from "../reducers/index";
import { isLoggedIn } from "./auth.selectors";
import { tap } from "rxjs/internal/operators/tap";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private store: Store<AppState>, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.store
            .pipe(
                select(isLoggedIn),     
                tap(loggedIn => {
                    if (!loggedIn) {
                        this.router.navigateByUrl('/login');        
                    }
                })   
            )
    }

}