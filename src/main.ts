import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { FollowersComponent } from './app/followers/followers.component'; // Importar el componente standalone

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
