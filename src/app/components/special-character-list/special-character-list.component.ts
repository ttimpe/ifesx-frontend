import { Router } from '@angular/router';
import { SpecialCharacter } from './../../models/special-character.model';
import { Component } from '@angular/core';
import { faPenSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SelectionType } from '@swimlane/ngx-datatable';
import { SpecialCharacterService } from 'src/app/services/special-character.service';

@Component({
  selector: 'app-special-character-list',
  templateUrl: './special-character-list.component.html',
  styleUrls: ['./special-character-list.component.css']
})
export class SpecialCharacterListComponent {
  specialCharacters: SpecialCharacter[] = [];
  selectionType: SelectionType = SelectionType.single
  selectedRow: SpecialCharacter[] = []
  faTrash = faTrash
  faPlus = faPlus
  faPenSquare = faPenSquare
  constructor(private specialCharacterService: SpecialCharacterService, private router: Router) {}

  ngOnInit(): void {
    this.loadSpecialCharacters();
  }
  onSelected({ selected }: any) {
    // 'selected' array contains the selected rows
    this.selectedRow = selected;
  }
  private loadSpecialCharacters(): void {
    this.specialCharacterService.getAllSpecialCharacters().subscribe(
      (specialCharacters) => {
        this.specialCharacters = specialCharacters;
      },
      (error) => {
        console.error('Error fetching announcements:', error);
      }
    );
  }
  addSpecialCharacter() {
    this.router.navigate(['/specialCharacters/add'])

  }
  editSpecialCharacter() {
    this.router.navigate(['/specialCharacters/' + this.selectedRow[0].id])
  }
  deleteSpecialCharacter() {

  }
}
