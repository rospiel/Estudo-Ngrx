// In a custom serializer ts file
import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store/src/models';
import { routerReducer, RouterReducerState } from '@ngrx/router-store/src/reducer';
import { StoreModule } from '@ngrx/store/src/store_module';
import { NgModule } from '@angular/core/src/metadata/ng_module';
import { AppState } from '../reducers/index';
import { RouterModule } from '@angular/router/src/router_module';
import { StoreRouterConnectingModule } from '@ngrx/router-store/src/router_store_module';
import { AuthState } from '../auth/auth.reducer';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface AppState {
  router: any;
  auth: AuthState;
}

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}
