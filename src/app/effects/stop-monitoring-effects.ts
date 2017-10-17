import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from "rxjs/Rx"

import * as StopMonitoringActions from '../actions/stop-monitoring-actions';
import { StopMonitoringService } from '../services/stop-monitoring.service';
import * as reducers from '../reducers';

@Injectable()
export class StopMonitoringEffects {

    constructor(private actions$: Actions,
        private service: StopMonitoringService,
        private store: Store<reducers.State>) { }

    @Effect() load$: Observable<Action> = this.actions$
        .ofType(StopMonitoringActions.ActionTypes.LOAD)
        .debounceTime(300)
        .map((action: StopMonitoringActions.LoadAction) => action.payload)
        .switchMap(query => {
            if (query === '') {
                return Observable.empty();
            }

            const next$ = this.actions$.ofType(StopMonitoringActions.ActionTypes.LOAD).skip(1);
            const request = this.service.getDocument(query);
            this.store.dispatch(new StopMonitoringActions.LoadingAction(request));
            return this.service.get(query)
                .takeUntil(next$)
                .map(result => new StopMonitoringActions.LoadSuccessAction({ "request": request, "result": result }))
                .catch(error => Observable.of(new StopMonitoringActions.LoadFailureAction({ "request": request, "error": error })));
        });
}