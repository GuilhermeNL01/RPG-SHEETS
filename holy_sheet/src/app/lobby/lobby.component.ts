import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-lobby',
    standalone: true,
    templateUrl: './lobby.component.html',
    styleUrl: './lobby.component.css',
    imports: [HeaderComponent]
})
export class LobbyComponent {

}
