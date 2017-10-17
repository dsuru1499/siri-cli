import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from "rxjs/Rx"

import { LineDiscoveryService } from '../services/lines-discovery.service';
import * as LinesDiscoveryActions from '../actions/lines-discovery-actions';
import * as reducers from '../reducers';


@Injectable()
export class LinesDiscoveryEffects {

    constructor(private actions$: Actions, 
        private service: LineDiscoveryService, 
        private store: Store<reducers.State>) { }

    @Effect() load$: Observable<Action> = this.actions$
        .ofType(LinesDiscoveryActions.ActionTypes.LOAD)
        .debounceTime(300)
        .map((action: LinesDiscoveryActions.LoadAction) => action.payload)
        .switchMap(query => {
            if (query === '') {
                return Observable.empty();
            }

            const next$ = this.actions$.ofType(LinesDiscoveryActions.ActionTypes.LOAD).skip(1);
            const request = this.service.getDocument(query);
            this.store.dispatch(new LinesDiscoveryActions.LoadingAction(request));
            return this.service.get(query)
                .takeUntil(next$)
                .map(result => new LinesDiscoveryActions.LoadSuccessAction({ "request": request, "result": result }))
                .catch(error => Observable.of(new LinesDiscoveryActions.LoadFailureAction({ "request": request, "error": error })));
        });
}