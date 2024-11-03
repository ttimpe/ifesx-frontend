import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpecialCharacter } from 'src/app/models/special-character.model';
import { SpecialCharacterService } from 'src/app/services/special-character.service';

@Component({
  selector: 'app-special-character-detail',
  templateUrl: './special-character-detail.component.html',
  styleUrls: ['./special-character-detail.component.css']
})
export class SpecialCharacterDetailComponent {
  specialCharacter: SpecialCharacter = new SpecialCharacter()

  constructor(    private route: ActivatedRoute,
    private specialCharacterService: SpecialCharacterService) {}
  ngAfterViewInit(): void {
    this.loadSpecialCharacter()

  }

  private loadSpecialCharacter(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.specialCharacterService.getSpecialCharacterById(Number(id)).subscribe(
        (specialCharacter) => {
          this.specialCharacter = specialCharacter;
        },
        (error) => {
          console.error('Error fetching special character:', error);
        }
      );
    }
  }
  saveSpecialCharacter() {
    console.log('saving')
    if (this.specialCharacter.id) {

      // Update existing line
      this.specialCharacterService.updateSpecialCharacter(this.specialCharacter).subscribe(
        (updatedSpecialCharacter: SpecialCharacter) => {
          console.log('Special character updated:', updatedSpecialCharacter);
        },
        (error: any) => {
          console.error('Error updating special character:', error);
        }
      );
    } else {
      this.specialCharacterService.createSpecialCharacter(this.specialCharacter).subscribe((createdSpecialCharacter: SpecialCharacter) => {
        console.log('announcement created', createdSpecialCharacter)
      }, (error: any) => {
        console.log('error creating special character', error)
      })
    }
  }
}
