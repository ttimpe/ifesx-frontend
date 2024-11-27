import { Tagesart } from 'src/app/models/tagesart.model';
// destination.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Betriebstag } from '../models/betriebstag.model';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private apiUrl = 'http://localhost:3000/calendar';

  constructor(private http: HttpClient) {}
  getTagesarten(): Observable<Tagesart[]> {
    const url = `${this.apiUrl}/tagesarten`;
    return this.http.get<Tagesart[]>(url);
  }


  // Tagesarten / Tagtypen (Mo-Fr/Sa/So)
  createTagesart(tagesart: Tagesart): Observable<Tagesart> {
    return this.http.post<Tagesart>(this.apiUrl + '/tagesarten', tagesart)
  }

  deleteTagesart(tagesart: Tagesart): Observable<boolean>{
    return this.http.delete<boolean>(this.apiUrl + `/tagesarten/${tagesart.tagesart_nr}`)

  }
  updateTagesart(tagesart: Tagesart): Observable<Tagesart> {
    return this.http.put<Tagesart>(this.apiUrl + `/tagesarten/`, tagesart)

  }

  // Kalendertage/Betriebstage (20241231) Zuordnung zu Tagesarten


  createBetriebstag(betriebstag: Betriebstag): Observable<Betriebstag> {
    return this.http.post<Betriebstag>(this.apiUrl + `/betriebstage`, betriebstag)
  }

  deleteBetriebstag(betriebstag: Betriebstag): Observable<boolean>{
    return this.http.delete<boolean>(this.apiUrl + `/betriebstage/${betriebstag.betriebstag}`)

  }
  updateBetriebstag(betriebstag: Betriebstag): Observable<Betriebstag> {
    return this.http.put<Betriebstag>(this.apiUrl + `/betriebstage`, betriebstag)

  }


  // VDV DV Versionen

  createVersion() {

  }

  editVersion() {

  }

  deleteVersion() {

  }
}
