import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-criador',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './criador.component.html',
  styleUrls: ['./criador.component.css']
})
export class CriadorComponent {
  characterName: string = '';
  characterRace: string = '';
  characterClass: string = '';
  characterLevel: number | null = null;

  strength: number | null = null;
  dexterity: number | null = null;
  constitution: number | null = null;
  intelligence: number | null = null;
  wisdom: number | null = null;
  charisma: number | null = null;

  criarFicha() {
    console.log('Ficha criada:', {
      characterName: this.characterName,
      characterRace: this.characterRace,
      characterClass: this.characterClass,
      characterLevel: this.characterLevel,
      strength: this.strength,
      dexterity: this.dexterity,
      constitution: this.constitution,
      intelligence: this.intelligence,
      wisdom: this.wisdom,
      charisma: this.charisma,
    });
  }
}
