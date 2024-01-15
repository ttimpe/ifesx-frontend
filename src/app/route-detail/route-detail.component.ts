import { StopService } from './../services/stop.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RouteService } from '../services/route.service';
import {DatatableComponent, SelectionType} from '@swimlane/ngx-datatable';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faTrash, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-route-detail',
  templateUrl: './route-detail.component.html',
  styleUrls: ['./route-detail.component.css']
})
export class RouteDetailComponent implements OnInit {
  faArrowDown = faArrowDown
  faArrowUp = faArrowUp
  faPlus = faPlus
  faTrash = faTrash

  lineId: string = '';
  routeId: number = 0;
  route?: any;
  selectedRow: any[] = []
  selectedStop: any;
  stopSearchTerm: string = ''; // Search term for stops
  availableStops: any[] = []
  selectionType: SelectionType = SelectionType.single
  constructor(private routeService: RouteService, private activatedRoute: ActivatedRoute, private stopService: StopService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {

      if (params['lineId'] && params['routeId']) {
        this.lineId = params['lineId'];
        this.routeId = params['routeId'];
      this.routeService.getRouteByLine(this.lineId, this.routeId).subscribe(route => {
        this.route = route;
      });
    }
    });
  }
  updateRoute() {
    this.routeService.updateRoute(this.route).subscribe(() => {
      // Handle success
      console.log('Route updated successfully');
    }, error => {
      // Handle error
      console.error('Error updating route', error);
    });
  }
  onSelected({ selected }: any) {
    // 'selected' array contains the selected rows
    this.selectedRow = selected;
  }

  searchStops() {
    // Search stops based on the stopSearchTerm
    if (this.stopSearchTerm != '') {
    this.stopService.searchStopsByName(this.stopSearchTerm).subscribe(stops => {
      this.availableStops = stops;
    });
    } else {
      this.availableStops = []
    }
  }

  addStopToRoute() {
    // Add the selected stop to the route
    if (this.selectedStop) {
      this.route.stops.push(this.selectedStop);
      this.selectedStop = null; // Clear the selected stop
    }
  }

  moveSelectedStopDown() {

  }
  moveSelectedStopUp() {

  }
  removeSelectedStop() {

  }

}
