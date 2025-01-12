import { Component } from '@angular/core';
import { FollowersComponent } from './followers/followers.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [FollowersComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'instagram-followers-app';
}
