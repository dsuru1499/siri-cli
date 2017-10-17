import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from "rxjs/Rx"

import * as StopPointsDiscoveryActions from '../actions/stop-points-discovery-actions';
import { StopPointsDiscoveryService } from '../services/stop-points-discovery.service';
import * as reducers from '../reducers';

@Injectable()
export class StopPointsDiscoveryEffects {

    constructor(private actions$: Actions,
        private service: StopPointsDiscoveryService,
        private store: Store<reducers.State>) { }

    @Effect() load$: Observable<Action> = this.actions$
        .ofType(StopPointsDiscoveryActions.ActionTypes.LOAD)
        .debounceTime(300)
        .map((action: StopPointsDiscoveryActions.LoadAction) => action.payload)
        .switchMap(query => {
            if (query === '') {
                return Observable.empty();
            }

            const next$ = this.actions$.ofType(StopPointsDiscoveryActions.ActionTypes.LOAD).skip(1);
            const request = this.service.getDocument(query);
            this.store.dispatch(new StopPointsDiscoveryActions.LoadingAction(request));
            return this.service.get(query)
                .takeUntil(next$)
                .map(result => new StopPointsDiscoveryActions.LoadSuccessAction({ "request": request, "result": result }))
                .catch(error => Observable.of(new StopPointsDiscoveryActions.LoadFailureAction({ "request": request, "error": error })));
        });
}