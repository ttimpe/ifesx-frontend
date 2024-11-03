import { Announcement } from './../models/announcement.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private apiUrl = 'http://localhost:3000/announcements';

  constructor(private http: HttpClient) {}
  getAllAnnouncementFiles(): Observable<string[]> {
    const url = `${this.apiUrl}/files`;
    return this.http.get<string[]>(url);
  }

  getAllAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(this.apiUrl);
  }
  getAnnouncementById(id: number): Observable<Announcement> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Announcement>(url);
  }

  createAnnouncement(announcement: Announcement): Observable<Announcement> {
    return this.http.post<Announcement>(this.apiUrl, announcement);
  }

  updateAnnouncement(announcement: Announcement): Observable<Announcement> {
    const url = `${this.apiUrl}/${announcement.id}`;
    return this.http.put<Announcement>(url, announcement);
  }
  deleteAnnouncement(announcement: Announcement): Observable<Announcement> {
    const url = `${this.apiUrl}/${announcement.id}`;
    return this.http.delete<Announcement>(url);
  }
}


