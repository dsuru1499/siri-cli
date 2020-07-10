import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable, of, EMPTY } from 'rxjs';
import { debounceTime, switchMap, skip , map, takeUntil, catchError } from 'rxjs/operators';

import * as StopPointsDiscoveryActions from '../actions/stop-points-discovery-actions';
import { StopPointsDiscoveryService } from '../services/stop-points-discovery.service';
import * as reducers from '../reducers';

@Injectable()
export class StopPointsDiscoveryEffects {

    constructor(private actions$: Actions,
                private service: StopPointsDiscoveryService,
                private store: Store<reducers.State>) { }

    @Effect() load$: Observable<Action> = this.actions$.pipe(
        ofType(StopPointsDiscoveryActions.ActionTypes.LOAD),
        debounceTime(300),
        map((action: StopPointsDiscoveryActions.LoadAction) => action.payload),
        switchMap(query => {
            if (query === '') {
                return EMPTY;
            }

            const next$ = this.actions$.pipe(ofType(StopPointsDiscoveryActions.ActionTypes.LOAD), skip(1));
            const request = this.service.getDocument(query);
            this.store.dispatch(new StopPointsDiscoveryActions.LoadingAction(request));
            return this.service.get(query).pipe(
                takeUntil(next$),
                map(result => new StopPointsDiscoveryActions.LoadSuccessAction({ request, result })),
                catchError(error => of(new StopPointsDiscoveryActions.LoadFailureAction({ request, error }))));
        }));
}
