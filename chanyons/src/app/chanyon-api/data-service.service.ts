import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  url = 'http://localhost:4000/';

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<any> {
    return this.http.get(this.url + 'user');
  }

  login(name: string): Observable<any> {
    return this.http.post(this.url + 'new-user', {name: name});
  }
}
