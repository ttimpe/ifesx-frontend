import { Destination } from './../../models/destination.model';
import { StopService } from '../../services/stop.service';
import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RouteService } from '../../services/route.service';
import {DatatableComponent, SelectionType} from '@swimlane/ngx-datatable';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash, faArrowUp, faArrowDown, faL } from '@fortawesome/free-solid-svg-icons';
import { Route } from '../../models/route.model';
import { RouteStop } from '../../models/route-stop.model';
import { Stop } from '../../models/stop.model';
import { DestinationService } from '../../services/destination.service';
import { TripRequestResponse } from 'src/app/models/trip-request-response.model';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { SpecialCharacter } from 'src/app/models/special-character.model';
import { SpecialCharacterService } from 'src/app/services/special-character.service';
import { AnnouncementService } from 'src/app/services/announcement.service';
import { Announcement } from 'src/app/models/announcement.model';
@Component({
  selector: 'app-route-detail',
  templateUrl: './route-detail.component.html',
  styleUrls: ['./route-detail.component.css']
})
export class RouteDetailComponent implements AfterViewInit {
  faArrowDown = faArrowDown
  faArrowUp = faArrowUp
  faPlus = faPlus
  faTrash = faTrash

  lineId: string = '';
  routeId: number = 0;
  route: Route = new Route()
  selectedRouteStop: RouteStop[] = []
  selectedStop?: RouteStop;
  stopSearchTerm: string = ''; // Search term for stops
  availableStops: Stop[] = []
  selectionType: SelectionType = SelectionType.single

  showingAutoRoute: boolean = false
  destinations: Destination[] = []

  specialCharacters: SpecialCharacter[] = []

  announcements: Announcement[] = []

  constructor(private routeService: RouteService, private activatedRoute: ActivatedRoute, private stopService: StopService, private destinationService: DestinationService, private specialCharacterService: SpecialCharacterService, private http: HttpClient, private location: Location, private announcementService: AnnouncementService) { }

  ngAfterViewInit(): void {

    this.activatedRoute.params.subscribe(params => {

      if (params['lineId'] && params['routeId']) {
        if (params['routeId'] == 'add') {
          console.log('should add route')
          this.lineId = params['lineId'];

        } else {
        this.lineId = params['lineId'];
        this.routeId = params['routeId'];
      this.routeService.getRouteByLine(this.lineId, this.routeId).subscribe(route => {
        this.route = route;
      });
    }
    }
    });
    this.destinationService.getAllDestinations().subscribe(destinations => {
      this.destinations = destinations;
      console.log(this.destinations)
    });
    this.specialCharacterService.getAllSpecialCharacters().subscribe(specialCharacters => {
      this.specialCharacters = specialCharacters;
      console.log(this.specialCharacters)
    })
    this.announcementService.getAllAnnouncements().subscribe(announcements => {
      this.announcements = announcements
    })

  }

  onSelected({ selected }: any) {
    // 'selected' array contains the selected rows
    this.selectedRouteStop = selected;
  }

  searchStops() {
    // Search stops based on the stopSearchTerm
    if (this.stopSearchTerm != '' && this.stopSearchTerm.length > 2) {
    this.stopService.searchStopsByName(this.stopSearchTerm).subscribe(stops => {
      this.availableStops = stops;
    });
    } else {
      this.availableStops = []
    }
  }

  saveRoute() {
    this.route.line_id = this.lineId
    if (this.route.id) {
      this.routeService.updateRoute(this.route).subscribe(() => {
        // Handle success
        console.log('Route updated successfully');
        this.location.back()

      }, error => {
        // Handle error
        console.error('Error updating route', error);
      });
    } else {
    this.routeService.createRoute(this.route).subscribe(() => {
      // Handle success
      console.log('Route saved successfully');
      this.location.back()
    }, error => {
      // Handle error
      console.error('Error updating route', error);
    });
  }
  }

  selectStop(stop: Stop) {
    const routeStop = new RouteStop()
    routeStop.stop = stop
    this.route.stops.push(routeStop)
    this.route.stops = [...this.route.stops]
  }
  moveSelectedStopDown() {
    const index = this.route.stops.findIndex(rs => rs === this.selectedRouteStop[0]);

    if (index !== -1 && index < this.route.stops.length - 1) {
      // Check if the element is not already at the bottom
      const temp = { ...this.route.stops[index] }; // Create a shallow copy to avoid modifying the original object
      this.route.stops[index] = { ...this.route.stops[index + 1] };
      this.route.stops[index + 1] = temp;
    }
    this.selectedRouteStop = [this.route.stops[index + 1]]
    this.route.stops = [...this.route.stops]
  }

  moveSelectedStopUp() {
    const index = this.route.stops.findIndex(rs => rs === this.selectedRouteStop[0]);

    if (index !== -1 && index > 0) {
      // Check if the element is not already at the bottom
      const temp = { ...this.route.stops[index] }; // Create a shallow copy to avoid modifying the original object
    this.route.stops[index] = { ...this.route.stops[index - 1] };
    this.route.stops[index - 1] = temp;
    }
    this.selectedRouteStop = [this.route.stops[index - 1]]
    this.route.stops = [...this.route.stops]
  }

  removeSelectedStop() {
    this.route.stops = this.route.stops.filter(rs => rs !== this.selectedRouteStop[0]);
  }


  showAutoRoute() {
    this.showingAutoRoute = true
  }

  autoRouteFound(routeStops: RouteStop[]) {
    console.log('auto route found')
    this.route.stops = routeStops
    this.showingAutoRoute = false
  }


}
