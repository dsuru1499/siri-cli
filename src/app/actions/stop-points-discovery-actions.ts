import { Action } from '@ngrx/store';

export const ActionTypes = {
    LOAD: 'STOP_POINTS_DISCOVERY',
    LOADING: 'STOP_POINTS_DISCOVERY_LOADING',
    LOAD_SUCCESS: 'STOP_POINTS_DISCOVERY_SUCCESS',
    LOAD_FAILURE: 'STOP_POINTS_DISCOVERY_FAILURE'
};

export class LoadAction implements Action {

    type = ActionTypes.LOAD;

    constructor(public payload: any) { }
}

export class LoadingAction implements Action {

    type = ActionTypes.LOADING;

    constructor(public payload: any) { }
}

export class LoadSuccessAction implements Action {

    type = ActionTypes.LOAD_SUCCESS;

    constructor(public payload: any) { }
}

export class LoadFailureAction implements Action {

    type = ActionTypes.LOAD_FAILURE;

    constructor(public payload: any) { }
}

export type Actions = LoadAction | LoadSuccessAction | LoadFailureAction;
