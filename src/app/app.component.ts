import { Component, OnInit } from '@angular/core';
import { FollowersComponent } from './followers/followers.component';
import { FooterComponent } from './footer/footer.component';
import { AppService } from '../service/version.service';
import { NavbarComponent } from './navbar/navbar.component';


@Component({
  selector: 'app-root',
  imports: [FollowersComponent, FooterComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {}
