import { Component, OnInit } from '@angular/core';
import { AppService } from '../../service/version.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appVersion = '';

  constructor(private appService: AppService) {}
  ngOnInit(): void {
    this.appService.getVersion().subscribe((data) => {
      this.appVersion = data.version;
    });
  }

  showVersion() {
    alert(`Versión de la aplicación: ${this.appVersion}`);
  }

}