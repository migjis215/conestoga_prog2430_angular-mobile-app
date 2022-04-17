import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Mobile App';
  public static types: string[] = ['Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Psychic'];
}
