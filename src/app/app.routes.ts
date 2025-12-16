import { Routes } from '@angular/router';

import { LineListComponent } from './components/line-list/line-list.component';
import { LineDetailComponent } from './components/line-detail/line-detail.component';
import { RouteDetailComponent } from './components/route-detail/route-detail.component';

import { StopListComponent } from './components/stop-list/stop-list.component';
import { StopDetailComponent } from './components/stop-detail/stop-detail.component';

import { DestinationListComponent } from './components/destination-list/destination-list.component';
import { DestinationDetailComponent } from './components/destination-detail/destination-detail.component';

import { AnnouncementListComponent } from './components/announcement-list/announcement-list.component';
import { AnnouncementDetailComponent } from './components/announcement-detail/announcement-detail.component';

import { SpecialCharacterListComponent } from './components/special-character-list/special-character-list.component';
import { SpecialCharacterDetailComponent } from './components/special-character-detail/special-character-detail.component';

import { ScheduleListComponent } from './components/schedule-list/schedule-list.component';
import { ScheduleDetailComponent } from './components/schedule-detail/schedule-detail.component';
import { TripEditorComponent } from './components/trip-editor/trip-editor.component';

import { GtfsImportComponent } from './components/gtfs-import/gtfs-import.component';
import { NetworkMapEditorComponent } from './components/network-map-editor/network-map-editor.component';
import { CalendarOverviewComponent } from './components/calendar-overview/calendar-overview.component';

export const routes: Routes = [
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

  { path: 'import', component: GtfsImportComponent },
  { path: 'network', component: NetworkMapEditorComponent },
  { path: 'calendar', component: CalendarOverviewComponent },

  { path: '', redirectTo: 'lines', pathMatch: 'full' }
];