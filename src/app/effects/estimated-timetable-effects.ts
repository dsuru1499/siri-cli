import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from "rxjs/Rx"

import * as EstimatedTimetableActions from '../actions/estimated-timetable-actions';
import { EstimatedTimetableService } from '../services/estimated-timetable.service';
import * as reducers from '../reducers';

@Injectable()
export class EstimatedTimetableEffects {

    constructor(private actions$: Actions, 
        private service: EstimatedTimetableService, 
        private store: Store<reducers.State>) { }

    @Effect() load$: Observable<Action> = this.actions$
        .ofType(EstimatedTimetableActions.ActionTypes.LOAD)
        .debounceTime(300)
        .map((action: EstimatedTimetableActions.LoadAction) => action.payload)
        .switchMap(query => {
            if (query === '') {
                return Observable.empty();
            }

            const next$ = this.actions$.ofType(EstimatedTimetableActions.ActionTypes.LOAD).skip(1);
            const request = this.service.getDocument(query);
            this.store.dispatch(new EstimatedTimetableActions.LoadingAction(request));
            return this.service.get(query)
                .takeUntil(next$)
                .map(result => new EstimatedTimetableActions.LoadSuccessAction({ "request": request, "result": result }))
                .catch(error => Observable.of(new EstimatedTimetableActions.LoadFailureAction({ "request": request, "error": error })));
        });
}