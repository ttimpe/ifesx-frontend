// app.module.ts
import './extensions/Time'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

import { AppComponent } from './app.component';
import { LineListComponent } from './components/line-list/line-list.component';
import { RouteListComponent } from './components/route-list/route-list.component';
import { RouteDetailComponent } from './components/route-detail/route-detail.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { StopPlatformNumberPipe } from './pipes/stop-platform-number.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StopDetailComponent } from './components/stop-detail/stop-detail.component';
import { StopListComponent } from './components/stop-list/stop-list.component';
import { GtfsImportComponent } from './components/gtfs-import/gtfs-import.component';
import { StopTypePipe } from './pipes/stop-type.pipe';
import { DestinationListComponent } from './components/destination-list/destination-list.component';
import { DestinationDetailComponent } from './components/destination-detail/destination-detail.component';
import { LineDetailComponent } from './components/line-detail/line-detail.component';
import { StopSearchFieldComponent } from './components/stop-search-field/stop-search-field.component';
import { AutoRouteComponent } from './components/auto-route/auto-route.component';
import { TitlebarComponent } from './components/titlebar/titlebar.component';
import { AnnouncementListComponent } from './components/announcement-list/announcement-list.component';
import { AnnouncementDetailComponent } from './components/announcement-detail/announcement-detail.component';
import { SpecialCharacterDetailComponent } from './components/special-character-detail/special-character-detail.component';
import { SpecialCharacterListComponent } from './components/special-character-list/special-character-list.component';
import { ScheduleListComponent } from './components/schedule-list/schedule-list.component';
import { ScheduleDetailComponent } from './components/schedule-detail/schedule-detail.component';
import { TripEditorComponent } from './components/trip-editor/trip-editor.component';
import { NetworkMapEditorComponent } from './components/network-map-editor/network-map-editor.component';
import { OperatingDayTimePickerComponent } from './components/operating-day-time-picker/operating-day-time-picker.component';
import { DayTimePipe } from './pipes/day-time.pipe';
import { CalendarOverviewComponent } from './components/calendar-overview/calendar-overview.component';
import { YearCalendarComponent } from './components/year-calendar/year-calendar.component';
import { BetriebstagModalComponent } from './components/betriebstag-modal/betriebstag-modal.component';
import { TagesartModalComponent } from './components/tagesart-modal/tagesart-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

registerLocaleData(localeDe, 'de');


@NgModule({ declarations: [
       StopPlatformNumberPipe,
        StopTypePipe,
         AppComponent,
        LineListComponent,
        RouteListComponent,
        RouteDetailComponent,
        StopDetailComponent,
        GtfsImportComponent,
        StopListComponent,
        DestinationListComponent,
        DestinationDetailComponent,
        LineDetailComponent,
        StopSearchFieldComponent,
        AutoRouteComponent,
        TitlebarComponent,
        AnnouncementListComponent,
        AnnouncementDetailComponent,
        SpecialCharacterDetailComponent,
        SpecialCharacterListComponent,
        ScheduleListComponent,
        ScheduleDetailComponent,
        TripEditorComponent,
        NetworkMapEditorComponent,
        OperatingDayTimePickerComponent,
        DayTimePipe,
        CalendarOverviewComponent,
        YearCalendarComponent,
        BetriebstagModalComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        FormsModule,
        NgxDatatableModule,
        
        RouterModule.forRoot([
            { path: 'lines', component: LineListComponent },
            { path: 'lines/:lineId', component: LineDetailComponent },
            { path: 'lines/:lineId/routes/:routeId', component: RouteDetailComponent },
            { path: 'lines/:lineId/routes/add', component: RouteDetailComponent },
            { path: 'stops', component: StopListComponent },
            { path: 'stops/:stopId', component: StopDetailComponent },
            { path: 'stops/add', component: StopDetailComponent },
            { path: 'destinations', component: DestinationListComponent },
            { path: 'destinations/:id', component: DestinationDetailComponent },
            { path: 'destinations/add', component: DestinationListComponent },
            { path: 'announcements', component: AnnouncementListComponent },
            { path: 'announcements/:id', component: AnnouncementDetailComponent },
            { path: 'announcements/add', component: AnnouncementDetailComponent },
            { path: 'specialCharacters', component: SpecialCharacterListComponent },
            { path: 'specialCharacters/:id', component: SpecialCharacterDetailComponent },
            { path: 'specialCharacters/add', component: SpecialCharacterDetailComponent },
            { path: 'schedule', component: ScheduleListComponent },
            { path: 'schedule/:id', component: ScheduleDetailComponent },
            { path: 'schedule/add', component: ScheduleDetailComponent },
            { path: 'schedule/:scheduleId/trips/:tripId', component: TripEditorComponent },
            { path: '', redirectTo: '/lines', pathMatch: 'full' },
            { path: 'import', component: GtfsImportComponent },
            { path: 'network', component: NetworkMapEditorComponent },
            { path: 'calendar', component: CalendarOverviewComponent }
        ]),
        FontAwesomeModule], providers: [
        { provide: LOCALE_ID, useValue: 'de' },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
