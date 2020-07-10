import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { reducer, runtimeChecks } from './reducers';

import { LineDiscoveryService } from './services/lines-discovery.service';
import { StopPointsDiscoveryService } from './services/stop-points-discovery.service';
import { StopMonitoringService } from './services/stop-monitoring.service';
import { EstimatedTimetableService } from './services/estimated-timetable.service';

import { LinesDiscoveryEffects } from './effects/lines-discovery-effects';
import { StopPointsDiscoveryEffects } from './effects/stop-points-discovery-effects';
import { StopMonitoringEffects } from './effects/stop-monitoring-effects';
import { EstimatedTimetableEffects } from './effects/estimated-timetable-effects';

import { StopMonitoringFormComponent } from './components/stop-monitoring-form/stop-monitoring-form.component';
import { EstimatedTimetableFormComponent } from './components/estimated-timetable-form/estimated-timetable-form.component';

import { LinesDiscoveryComponent } from './containers/lines-discovery/lines-discovery.component';
import { StopPointsDiscoveryComponent } from './containers/stop-points-discovery/stop-points-discovery.component';
import { StopMonitoringComponent } from './containers/stop-monitoring/stop-monitoring.component';
import { EstimatedTimetableComponent } from './containers/estimated-timetable/estimated-timetable.component';
import { XmlviewComponent } from './components/xmlview/xmlview.component';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    EstimatedTimetableFormComponent,
    StopMonitoringFormComponent,
    EstimatedTimetableComponent,
    LinesDiscoveryComponent,
    StopPointsDiscoveryComponent,
    StopMonitoringComponent,
    XmlviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducer, runtimeChecks),
    EffectsModule.forRoot([LinesDiscoveryEffects, StopPointsDiscoveryEffects, StopMonitoringEffects, EstimatedTimetableEffects]),
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatFormFieldModule,
    MatDividerModule,
    MatInputModule,
    MatSelectModule,
  ],
  providers: [LineDiscoveryService, StopPointsDiscoveryService, StopMonitoringService, EstimatedTimetableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
