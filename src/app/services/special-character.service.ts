import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpecialCharacter } from '../models/special-character.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialCharacterService {
  private apiUrl = 'http://localhost:3000/specialCharacters';

  constructor(private http: HttpClient) {}


  getAllSpecialCharacters(): Observable<SpecialCharacter[]> {
    return this.http.get<SpecialCharacter[]>(this.apiUrl);
  }
  getSpecialCharacterById(id: number): Observable<SpecialCharacter> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<SpecialCharacter>(url);
  }

  createSpecialCharacter(specialCharacter: SpecialCharacter): Observable<SpecialCharacter> {
    return this.http.post<SpecialCharacter>(this.apiUrl, specialCharacter);
  }

  updateSpecialCharacter(specialCharacter: SpecialCharacter): Observable<SpecialCharacter> {
    const url = `${this.apiUrl}/${specialCharacter.id}`;
    return this.http.put<SpecialCharacter>(url, specialCharacter);
  }
}
