import { Action } from '@ngrx/store';

export const ActionTypes = {
    LOAD: 'STOP_MONITORING',
    LOADING: 'STOP_MONITORING_LOADING',
    LOAD_SUCCESS: 'STOP_MONITORING_SUCCESS',
    LOAD_FAILURE: 'STOP_MONITORING_FAILURE'
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
