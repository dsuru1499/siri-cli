import { ActionReducer, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { createSelector } from 'reselect';

import * as LinesDiscovery from './lines-discovery-reducer';
import * as StopPointsDiscovery from './stop-points-discovery-reducer';
import * as StopMonitoring from './stop-monitoring-reducer';
import * as EstimatedTimetable from './estimated-timetable-reducer';

export interface State {
  ld: LinesDiscovery.State;
  sd: StopPointsDiscovery.State;
  sm: StopMonitoring.State;
  et: EstimatedTimetable.State;
}

export const reducer = {
  ld: LinesDiscovery.reducer,
  sd: StopPointsDiscovery.reducer,
  sm: StopMonitoring.reducer,
  et: EstimatedTimetable.reducer,
};

export const ld = (state: State) => state.ld;
export const ldState = createSelector(ld, LinesDiscovery.state);

export const sd = (state: State) => state.sd;
export const sdState = createSelector(sd, StopPointsDiscovery.state);


export const sm = (state: State) => state.sm;
export const smState = createSelector(sm, StopMonitoring.state);

export const et = (state: State) => state.et;
export const etState = createSelector(et, EstimatedTimetable.state);

export function isEmpty(o: any) {
  return (o === undefined || o === null || Object.keys(o).length === 0 && o.constructor === Object);
}