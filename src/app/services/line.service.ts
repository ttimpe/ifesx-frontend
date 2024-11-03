// line.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Line } from '../models/line.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LineService {
  private apiUrl = 'http://localhost:3000/lines'; // Update with your API URL

  constructor(private http: HttpClient) { }

  getLines() {
    return this.http.get<Line[]>(`${this.apiUrl}`);
  }
  getLineById(id: string): Observable<Line> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Line>(url);
  }

  createLine(line: Line): Observable<Line> {
    return this.http.post<Line>(this.apiUrl, line);
  }

  updateLine(line: Line): Observable<Line> {
    const url = `${this.apiUrl}/${line.id}`;
    return this.http.put<Line>(url, line);
  }

}
