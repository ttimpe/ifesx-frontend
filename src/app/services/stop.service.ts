// stop.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Import map from the RxJS operators
import { Stop } from '../models/stop.model';

@Injectable({
  providedIn: 'root'
})
export class StopService {
  private apiUrl = 'http://localhost:3000'; // Update with your API URL

  constructor(private http: HttpClient) { }

  getAllStops(): Observable<Stop[]> {
    const url = `${this.apiUrl}/stops`;
    return this.http.get<Stop[]>(url);
  }

  getStopById(id: string): Observable<Stop> {
    const url = `${this.apiUrl}/stops/${id}`;
    return this.http.get<Stop>(url);
  }

  searchStopsByName(name: string): Observable<Stop[]> {
    return this.getAllStops().pipe(
      // Filter stops based on the search term
      map(stops => stops.filter(stop => stop.name.toLowerCase().includes(name.toLowerCase())))
    );
  }
  updateStop(stop: Stop): Observable<Stop> {
    const url = `${this.apiUrl}/stops/${stop.id}`;
    return this.http.put<Stop>(url, stop);
  }
}

