import { RouteService } from './../../services/route.service';
import { Line } from 'src/app/models/line.model';
import { LineService } from './../../services/line.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { Route } from 'src/app/models/route.model';
import { SelectionType } from '@swimlane/ngx-datatable';
import { StopTime } from 'src/app/models/stop-time.model';
import { ScheduleService } from 'src/app/services/schedule.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trip-editor',
  templateUrl: './trip-editor.component.html',
  styleUrls: ['./trip-editor.component.css']
})
export class TripEditorComponent {
  lines: Line[] = []

  trip: Trip = new Trip()


  line?: Line
  route?: Route


  selectedLineID?: string
  selectedRouteID?: number




  routes: Route[] = []
  scheduleId?: number
  constructor(private lineService: LineService, private routeService: RouteService, private scheduleService: ScheduleService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getAllLines()

  }
  ngAfterViewInit() {
    this.activatedRoute.params.subscribe(params => {
      this.scheduleId = params['scheduleId'];
      const tripId = params['tripId'];

      if (tripId != 'add' && this.scheduleId) {
      this.scheduleService.getTripById(this.scheduleId, tripId).subscribe(trip => {
        this.trip = trip;
        if (this.trip.route) {
          this.selectedLineID = this.trip.route?.line_id
          this.routeService.getRoutesByLine(this.selectedLineID).subscribe(routes => {
            this.routes = routes

        })
        }
      });
    }
    /*
    else {
      const _stop = new Stop()
      _stop.information = new StopInformation()
      this.stop = _stop
    }*/
    });
  }

  getAllLines() {
    this.lineService.getLines().subscribe(lines => {
      lines.sort((a: Line, b: Line) => {
          return parseInt(a.number) - parseInt(b.number)
      })
      this.lines = lines
    });
  }

  onLineChange(lineID: string) {

    this.routeService.getRoutesByLine(lineID).subscribe(routes => {

        console.log('setting routes for line', lineID)
        this.routes = routes

    })
  }

  onRouteChange(routeID: number) {
    console.log('selected route', routeID)
    this.trip.stopTimes = []
    const route = this.routes.find(r => r.id == routeID)
    this.route = route
    var _stopTimes: StopTime[] = []
    if (route) {
      console.log(route)
    route.stops.forEach( (stop) => {
      let stopTime = new StopTime()
      stopTime.stop = stop
      stopTime.route_stop_id = stop.id
      _stopTimes.push(stopTime)

    })
    this.trip.stopTimes = [..._stopTimes]
    console.log(this.trip.stopTimes)
    this.trip.routeId = routeID

  }
  }

/*
  setTrip(trip: Trip | undefined) {
    if (trip) {
    this.trip = trip
    this.route = trip.route
    this.departureTime = trip.departureTime
    if (this.route && this.route.line) {
      this.line = this.route.line
      this.selectedLineID = trip.route?.line.id
      this.selectedRouteID = trip.route?.id
    }
    this.stopTimes = trip.stopTimes
    this.turnaroundTime = trip.turnaroundTime
    this.courseNumber = trip.courseNumber
    if (this.selectedLineID) {
    this.routeService.getRoutesByLine(this.selectedLineID).subscribe(routes => {

      console.log('setting routes for line')
      this.routes = routes
      console.log(this.routes)


  })
}
    } else {
      this.route = undefined
      this.departureTime = '00:00'
      this.stopTimes = []
      this.selectedLineID = undefined
      this.selectedRouteID = undefined
      this.turnaroundTime = 0
      this.courseNumber = 0
      this.routes = []

    }
    console.log('set trip called')
  }*/
  onSave() {
    if (this.scheduleId) {
    if (this.trip.id) {
    this.scheduleService.updateTrip(this.scheduleId, this.trip).subscribe((updatedTrip: Trip) => {
      console.log('Trip updated')
    })
    } else {
      this.scheduleService.createTrip(this.scheduleId, this.trip).subscribe((savedTrip: Trip) => {
        console.log('Trip saved')
      })
    }
  }
  }



}
