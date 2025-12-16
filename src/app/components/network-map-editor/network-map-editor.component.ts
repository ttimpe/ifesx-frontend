import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import { StopDistance } from 'src/app/models/stop-distance.model';
import { Stop } from 'src/app/models/stop.model';
import { TripRequestResponse } from 'src/app/models/trip-request-response.model';
import { TitlebarComponent } from '../titlebar/titlebar.component';

@Component({
  selector: 'app-network-map-editor',
  templateUrl: './network-map-editor.component.html',
  styleUrls: ['./network-map-editor.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TitlebarComponent]
})


export class NetworkMapEditorComponent {
  private map!: L.Map
  private stops: Stop[] = []
  private stop_distances: StopDistance[] = []
  distance: number = 0
  selectedOriginStop?: Stop
  selectedDestinationStop?: Stop
  time: number = 60
  selectedDistance?: L.Polyline
  constructor(private http: HttpClient) {

  }

  ngAfterViewInit() {
    console.log('After view init')
    this.initMap();
  }
  loadStops() {
    this.http.get<Stop[]>('http://localhost:3000/stops').subscribe(stops => {
      this.stops = stops;
      this.createStopMarkers()

    });
  }
  loadStopDistances() {
    this.http.get<StopDistance[]>('http://localhost:3000/network/distances').subscribe(distances => {
      this.stop_distances = distances;
      this.createDistancePolylines()

    });
  }
  saveDistance() {
    if (this.selectedDestinationStop && this.selectedOriginStop) {
    let stopDistance = new StopDistance()
    stopDistance.destination_stop_id = this.selectedDestinationStop.id
    stopDistance.origin_stop_id = this.selectedOriginStop.id
    stopDistance.distance = this.distance
    stopDistance.time = this.time
    console.log('trying to save distance', stopDistance)
      this.http.post('http://localhost:3000/network/distances', stopDistance).subscribe((e) => {
        console.log(e)
        this.selectedDestinationStop = undefined;
        this.selectedOriginStop = undefined;
        this.distance = 0;
      })
    }
  }

  createStopMarkers() {
 //   let markers: L.CircleMarker[] = []
    for (var i=0; i<this.stops.length; i++) {
      let location = new L.LatLng(this.stops[i].latitude, this.stops[i].longitude);
     if (this.map.getBounds().contains(location)) {
        // We should add the stop marker
        let marker = new L.CircleMarker(location, {
          radius: 2,
          color: "navy",
          fill: true
        })/*
        .bindTooltip(this.stops[i].name,
          {
              permanent: true,
              direction: 'right'
          }
      );*/
        L.setOptions(marker, { stop: this.stops[i]})

       marker.addTo(this.map)
       marker.on("click", (e) => {
        if (e.target.options['stop'] != undefined) {
          if (this.selectedOriginStop == undefined && this.selectedDestinationStop == undefined) {
            this.selectedOriginStop = (e.target.options['stop'] as Stop)
          } else if (this.selectedOriginStop != undefined && this.selectedDestinationStop == undefined)  {
            this.selectedDestinationStop = (e.target.options['stop'] as Stop)
            // Now draw line
            let originStopPoint = new L.LatLng(this.selectedOriginStop.latitude, this.selectedOriginStop.longitude);
            let destinationStopPoint = new L.LatLng(this.selectedDestinationStop.latitude, this.selectedDestinationStop.longitude);

            this.selectedDistance?.removeFrom(this.map)
            this.selectedDistance = new L.Polyline ([originStopPoint, destinationStopPoint], {
              color: 'red',
              weight: 1
            })
            this.selectedDistance.addTo(this.map)

          }
        }
        console.log(e.target.options['stop'])
      })
    }
    }



  }

  createDistancePolylines() {
    for (var i=0; i<this.stop_distances.length; i++) {
            let originStopPoint = new L.LatLng(this.stop_distances[i].originStop.latitude, this.stop_distances[i].originStop.longitude);
            let destinationStopPoint = new L.LatLng(this.stop_distances[i].destinationStop.latitude, this.stop_distances[i].destinationStop.longitude);

            let distancePolyline = new L.Polyline ([originStopPoint, destinationStopPoint], {
              color: (this.stop_distances[i].distance > 0 && this.stop_distances[i].time > 0) ? 'lime' : 'red',
              weight: 1
            }).bindTooltip(Math.round(this.stop_distances[i].distance) + " m, " + this.stop_distances[i].time + " Sekunden",
              {
                  permanent: true,
                  direction: 'right'
              }
          );
            distancePolyline.addTo(this.map)

    }
  }
  clearSelection() {
    this.selectedDestinationStop = undefined;
    this.selectedOriginStop = undefined;
    this.distance = 0;
    this.time = 60;
    this.selectedDistance?.removeFrom(this.map)
  }

  initMap() {
    var tileLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')

    this.map = L.map('map', {
      zoomControl: true,
      layers:[tileLayer],
      center: [52.0236952, 8.5315316],
      zoom: 13
    })

    this.loadStops()
    this.loadStopDistances();

    setTimeout(() => {
      this.map.invalidateSize();
    }, 2000);



  }

  getDistanceBetweenStops() {
    let url = 'https://westfalenfahrplan.de/nwl-efa/XML_TRIP_REQUEST2?allInterchangesAsLegs=1&convertAddressesITKernel2LocationServer=1&convertCoord2LocationServer=1&convertCrossingsITKernel2LocationServer=1&convertPOIsITKernel2LocationServer=1&convertStopsPTKernel2LocationServer=1&coordOutputDistance=1&coordOutputFormat=WGS84%5Bdd.ddddd%5D&genC=1&genMaps=0&imparedOptionsActive=1&inclMOT_1=true&inclMOT_10=true&inclMOT_11=true&inclMOT_13=true&inclMOT_14=true&inclMOT_15=true&inclMOT_16=true&inclMOT_17=true&inclMOT_18=true&inclMOT_19=true&inclMOT_2=true&inclMOT_3=true&inclMOT_4=true&inclMOT_5=true&inclMOT_6=true&inclMOT_7=true&inclMOT_8=true&inclMOT_9=true&includedMeans=checkbox&itOptionsActive=1&itdTripDateTimeDepArr=dep&language=de&lineRestriction=400&locationServerActive=1&name_destination=' + this.selectedDestinationStop?.id + '&name_origin=' + this.selectedOriginStop?.id + '&nwlTripMacro=1&outputFormat=rapidJSON&ptOptionsActive=1&routeType=LEASTTIME&serverInfo=1&trITMOTvalue100=10&type_destination=any&type_notVia=any&type_origin=any&type_via=any&useProxFootSearch=true&useRealtime=1&useUT=1&version=10.5.17.3&anyObjFilter_origin=2&&anyObjFilter_destination=2&ptOptionsActive=1&routeType=LEASTWALKING'
    console.log('Finding route')
    this.http.get<TripRequestResponse>(url).subscribe(data => {

      if (data.journeys && data.journeys[0].legs) {
        var distance = 0;
        for (var i=0; i<data.journeys[0].legs[0].coords.length; i++) {
          distance += data.journeys[0].legs[0].coords[i][2]['d'];
        }
        console.log('distance is ', distance, ' m')
        this.distance = distance
      }
    })
      // Extracting stop ids from the stopSequence of the first journey's legs


  }

}
