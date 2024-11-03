// destination.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Destination } from '../models/destination.model';

@Injectable({
  providedIn: 'root',
})
export class DestinationService {
  private apiUrl = 'http://localhost:3000/destinations';

  constructor(private http: HttpClient) {}

  getAllDestinations(): Observable<Destination[]> {
    return this.http.get<Destination[]>(this.apiUrl);
  }
  getDestinationById(id: number): Observable<Destination> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Destination>(url);
  }

  createDestination(destination: Destination): Observable<Destination> {
    return this.http.post<Destination>(this.apiUrl, destination);
  }

  updateDestination(destination: Destination): Observable<Destination> {
    const url = `${this.apiUrl}/${destination.id}`;
    return this.http.put<Destination>(url, destination);
  }

  // Add other CRUD methods as needed
}
