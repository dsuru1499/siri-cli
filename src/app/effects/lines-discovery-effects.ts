import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable, of, EMPTY } from 'rxjs';
import { debounceTime, switchMap, skip , map, takeUntil, catchError } from 'rxjs/operators';

import { LineDiscoveryService } from '../services/lines-discovery.service';
import * as LinesDiscoveryActions from '../actions/lines-discovery-actions';
import * as reducers from '../reducers';


@Injectable()
export class LinesDiscoveryEffects {

    constructor(private actions$: Actions,
                private service: LineDiscoveryService,
                private store: Store<reducers.State>) { }

    @Effect() load$: Observable<Action> = this.actions$.pipe(
        ofType(LinesDiscoveryActions.ActionTypes.LOAD),
        debounceTime(300),
        map((action: LinesDiscoveryActions.LoadAction) => action.payload),
        switchMap(query => {
            if (query === '') {
                return EMPTY;
            }

            const next$ = this.actions$.pipe(ofType(LinesDiscoveryActions.ActionTypes.LOAD), skip(1));
            const request = this.service.getDocument(query);
            this.store.dispatch(new LinesDiscoveryActions.LoadingAction(request));
            return this.service.get(query).pipe(
                takeUntil(next$),
                map(result => new LinesDiscoveryActions.LoadSuccessAction({ request, result })),
                catchError(error => of(new LinesDiscoveryActions.LoadFailureAction({ request, error }))));
        }));
}
