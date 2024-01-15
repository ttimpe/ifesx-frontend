// app.module.ts

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LineListComponent } from './line-list/line-list.component';
import { RouteListComponent } from './route-list/route-list.component';
import { RouteDetailComponent } from './route-detail/route-detail.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { StopPlatformNumberPipe } from './pipes/stop-platform-number.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StopDetailComponent } from './stop-detail/stop-detail.component';
import { StopListComponent } from './stop-list/stop-list.component';
import { GtfsImportComponent } from './gtfs-import/gtfs-import.component';
import { StopTypePipe } from './pipes/stop-type.pipe';
import { DestinationListComponent } from './destination-list/destination-list.component';
import { DestinationDetailComponent } from './destination-detail/destination-detail.component';
import { LineDetailComponent } from './line-detail/line-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LineListComponent,
    RouteListComponent,
    RouteDetailComponent,
    StopDetailComponent,
    GtfsImportComponent,
    StopListComponent,
    DestinationListComponent,
    DestinationDetailComponent,
    LineDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgxDatatableModule,
    StopPlatformNumberPipe,
    StopTypePipe,
    RouterModule.forRoot([
      { path: 'lines', component: LineListComponent },
      { path: 'lines/:lineId', component: LineDetailComponent },
      { path: 'lines/:lineId/routes', component: RouteListComponent },
      { path: 'stops', component: StopListComponent},
      { path: 'stops/:stopId', component: StopDetailComponent},
      { path: 'destinations', component: DestinationListComponent},
      { path: 'destinations/:id', component: DestinationDetailComponent},
      { path: '', redirectTo: '/lines', pathMatch: 'full' },
      { path: 'routes/:lineId/:routeId', component: RouteDetailComponent }, // Add this route
      { path: 'import', component: GtfsImportComponent}
    ]),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
