import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from "../config/config.json";
import { parseString } from "xml2js";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScriptsService {
  videoId: string;

  constructor(private http: HttpClient) { }

  initScripts(scripts: Array<object>): any {
    return this.http.post(`${config.server_url}/translation/${this.videoId}`, scripts);
  }

  getXMLScript(videoId : string): Observable<any> {
    this.videoId = videoId;
    const request = `http://video.google.com/timedtext?v=${this.videoId}&lang=en`;
    return this.http.get(request, { responseType: 'text' });
  }


  checkScriptIsExist(): Observable<any> {
    const request = `${config.server_url}/translation/${this.videoId}`;
    return this.http.get(request);
  }

}
