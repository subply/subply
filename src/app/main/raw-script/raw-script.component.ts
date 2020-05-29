import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { parseString } from 'xml2js';

@Component({
  selector: 'app-raw-script',
  templateUrl: './raw-script.component.html',
  styleUrls: ['./raw-script.component.css']
})

export class RawScriptComponent implements OnInit {
  scripts: Array<object> = [];
  @Input() videoId: string;
  URL: string;
  scriptExist: boolean = false;
  loading: boolean = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  ngOnChanges(){
    if(this.videoId){
      this.URL = `http://video.google.com/timedtext?v=${this.videoId}&lang=en`;
      this.getXMLFromURL();
    }
  }

  getXMLFromURL() {
    this.http.get(this.URL, { responseType: 'text' }).subscribe(
      response=>{
        // if(!response){ this.loading = false; return; } 
        this.getScriptsFromXML(response);
        this.scriptExist = true;
        this.loading = false;
      }
      );
  }

  

  getScriptsFromXML(xml_string) {
    parseString(xml_string, { explicitArray: false }, (error, result) => {
      if (error) {
        throw new Error(error);
      } else {
        const returned_scripts = result.transcript.text;
        returned_scripts.map((script) => {
          const start = parseFloat(script.$.start);
          const end = start + parseFloat(script.$.dur);

          this.scripts.push({
            script: script._,
            startTime: start,
            endTime: end
          })
        });
      }
    });
  }

  handleclick(i) {
    console.log(i);
  }

}
