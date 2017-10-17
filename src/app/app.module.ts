import { BrowserModule } from '@angular/platform-browser';
import { PolymerElement } from '@vaadin/angular2-polymer';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome/angular-font-awesome';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';
import { reducer } from './reducers';

import { LineDiscoveryService } from './services/lines-discovery.service';
import { StopPointsDiscoveryService } from './services/stop-points-discovery.service';
import { StopMonitoringService } from './services/stop-monitoring.service';
import { EstimatedTimetableService } from './services/estimated-timetable.service';

import { LinesDiscoveryEffects } from './effects/lines-discovery-effects';
import { StopPointsDiscoveryEffects } from './effects/stop-points-discovery-effects';
import { StopMonitoringEffects } from './effects/stop-monitoring-effects';
import { EstimatedTimetableEffects } from './effects/estimated-timetable-effects';

import { JsonviewComponent } from './components/jsonview/jsonview.component';
import { StopMonitoringFormComponent } from './components/stop-monitoring-form/stop-monitoring-form.component';
import { EstimatedTimetableFormComponent } from './components/estimated-timetable-form/estimated-timetable-form.component';

import { LinesDiscoveryComponent } from './containers/lines-discovery/lines-discovery.component';
import { StopPointsDiscoveryComponent } from './containers/stop-points-discovery/stop-points-discovery.component';
import { StopMonitoringComponent } from './containers/stop-monitoring/stop-monitoring.component';
import { EstimatedTimetableComponent } from './containers/estimated-timetable/estimated-timetable.component';
import { XmlviewComponent } from './components/xmlview/xmlview.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    // PolymerElement('paper-input'),
    // PolymerElement('vaadin-combo-box'),
    JsonviewComponent,
    StopMonitoringFormComponent,
    EstimatedTimetableFormComponent,
    LinesDiscoveryComponent,
    StopPointsDiscoveryComponent,
    StopMonitoringComponent,
    EstimatedTimetableComponent,
    XmlviewComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.provideStore(reducer),
    EffectsModule.run(LinesDiscoveryEffects),
    EffectsModule.run(StopPointsDiscoveryEffects),
    EffectsModule.run(StopMonitoringEffects),
    EffectsModule.run(EstimatedTimetableEffects),
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFontAwesomeModule
  ],
  providers: [LineDiscoveryService, StopPointsDiscoveryService, StopMonitoringService, EstimatedTimetableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
