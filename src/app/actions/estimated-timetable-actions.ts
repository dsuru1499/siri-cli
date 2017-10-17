import { Action } from '@ngrx/store';

export const ActionTypes = {
    LOAD: 'ESTIMATED_TIMETABLE',
    LOADING: 'ESTIMATED_TIMETABLE_LOADING',
    LOAD_SUCCESS: 'ESTIMATED_TIMETABLE_SUCCESS',
    LOAD_FAILURE: 'ESTIMATED_TIMETABLE_FAILURE'
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
