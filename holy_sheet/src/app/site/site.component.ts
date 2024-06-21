import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-site',
    standalone: true,
    templateUrl: './site.component.html',
    styleUrl: './site.component.css',
    imports: [HeaderComponent]
})
export class SiteComponent {

}
