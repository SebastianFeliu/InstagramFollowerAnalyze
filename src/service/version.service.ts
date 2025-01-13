import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  versionData: any;
  versionUrl: string;
  constructor(private http: HttpClient) { // Construir la URL dependiendo del entorno
    this.versionUrl = environment.baseHref + 'version.json';
    this.getVersion();
  }

  getVersion(): Observable<{ version: string }> {
    return this.http.get<{ version: string }>(this.versionUrl);
  }
}
