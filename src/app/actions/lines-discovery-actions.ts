import { Action } from '@ngrx/store';

export const ActionTypes = {
    LOAD: 'LINE_DISCOVERY_LOAD',
    LOADING: 'LINE_DISCOVERY_LOADING',
    LOAD_SUCCESS: 'LINE_DISCOVERY_SUCCESS',
    LOAD_FAILURE: 'LINE_DISCOVERY_FAILURE'
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

export type Actions = LoadAction | LoadingAction | LoadSuccessAction | LoadFailureAction;
