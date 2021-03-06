import { ActionTypes, Actions } from '../actions/stop-monitoring-actions';

export interface State {
    request: any;
    response: any;
}

export const initialState: State = {
    request: {},
    response: {},
};

// tslint:disable-next-line: no-shadowed-variable
export function reducer(state = initialState, action: Actions): State {

    switch (action.type) {

        case ActionTypes.LOAD_SUCCESS: {
            const result = Object.assign({}, state, {
                request: action.payload.request,
                response: action.payload.result
            });

            return result;
        }

        case ActionTypes.LOAD_FAILURE: {
            return Object.assign({}, state, {
                request: action.payload.request,
                response: {}
            });
        }

        case ActionTypes.LOADING: {
            return Object.assign({}, state, {
                request: action.payload,
                response: {}
            });
        }
        default: {
            return Object.assign({}, state, {});
        }
    }
}

// tslint:disable-next-line: no-shadowed-variable
export const state = (state: State) => state;
