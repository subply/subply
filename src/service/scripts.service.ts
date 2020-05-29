import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScriptsService {

  constructor(private http: HttpClient) { }

  getXMLFromURL(URL: string):any{
    return this.http.get(URL, { responseType: 'text' })
  }
}
