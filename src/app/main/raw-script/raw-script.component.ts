import { Component, OnInit } from '@angular/core';
import { Rawscript } from 'src/app/rawscript';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { parseString } from 'xml2js';

const URL = `http://video.google.com/timedtext?v=G4ROcoq32rQ&lang=en`;

@Component({
  selector: 'app-raw-script',
  templateUrl: './raw-script.component.html',
  styleUrls: ['./raw-script.component.css']
})

export class RawScriptComponent implements OnInit {
  scripts: Array<object> = [
  ];

  constructor(private http: HttpClient) {
    this.loadVideoURL();
  }

  ngOnInit(): void {

  }

  loadVideoURL() {
    this.http.get(URL, { responseType: 'text' }).subscribe(response => {
      this.loadXML(response);
    });
  }

  loadXML(xml_string) {
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

  handleclick() {
    alert('clicked');
  }

}
