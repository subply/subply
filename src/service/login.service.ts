import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../config/config.json';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(id, password):Observable<any>{
    return this.http.post<any>(`${config.server_url}/user/login`, { id, password });
  }

  setLocalStorage(id){
    localStorage.setItem("id", id);
  }

}
