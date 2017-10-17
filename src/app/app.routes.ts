import { Routes } from '@angular/router';
import { LinesDiscoveryComponent } from './containers/lines-discovery/lines-discovery.component';
import { StopPointsDiscoveryComponent } from './containers/stop-points-discovery/stop-points-discovery.component';
import { StopMonitoringComponent } from './containers/stop-monitoring/stop-monitoring.component';
import { EstimatedTimetableComponent } from './containers/estimated-timetable/estimated-timetable.component';

export const AppRoutes: Routes = [
    { path: 'line-discovery', component: LinesDiscoveryComponent },
    { path: 'stop-points-discovery', component: StopPointsDiscoveryComponent },
    { path: 'stop-monitoring', component: StopMonitoringComponent },
    { path: 'estimated-timetable', component: EstimatedTimetableComponent },
];