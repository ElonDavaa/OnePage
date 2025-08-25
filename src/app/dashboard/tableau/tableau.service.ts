import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TableauService {

  constructor(private http: HttpClient) { }

  getTableauToken(): Observable<any> {
    return this.http.get(`${environment.news}/api/custom/external/tableau-token`);
  }
}
