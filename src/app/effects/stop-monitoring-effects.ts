import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable, of, EMPTY } from 'rxjs';
import { debounceTime, switchMap, skip , map, takeUntil, catchError } from 'rxjs/operators';

import * as StopMonitoringActions from '../actions/stop-monitoring-actions';
import { StopMonitoringService } from '../services/stop-monitoring.service';
import * as reducers from '../reducers';

@Injectable()
export class StopMonitoringEffects {

    constructor(private actions$: Actions,
                private service: StopMonitoringService,
                private store: Store<reducers.State>) { }

    @Effect() load$: Observable<Action> = this.actions$.pipe(
        ofType(StopMonitoringActions.ActionTypes.LOAD),
        debounceTime(300),
        map((action: StopMonitoringActions.LoadAction) => action.payload),
        switchMap(query => {
            if (query === '') {
                return EMPTY;
            }

            const next$ = this.actions$.pipe(ofType(StopMonitoringActions.ActionTypes.LOAD), skip(1));
            const request = this.service.getDocument(query);
            this.store.dispatch(new StopMonitoringActions.LoadingAction(request));
            return this.service.get(query).pipe(
                takeUntil(next$),
                map(result => new StopMonitoringActions.LoadSuccessAction({ request, result })),
                catchError(error => of(new StopMonitoringActions.LoadFailureAction({ request, error }))));
        }));
}
