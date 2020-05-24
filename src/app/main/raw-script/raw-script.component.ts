import { Component, OnInit } from '@angular/core';
import { Rawscript } from 'src/app/rawscript';

@Component({
  selector: 'app-raw-script',
  templateUrl: './raw-script.component.html',
  styleUrls: ['./raw-script.component.css']
})
export class RawScriptComponent implements OnInit {

  scripts = [
    new Rawscript(0, "Hello, my name is sonia!", 4.503, 5.000),
    new Rawscript(1, "This is my first video.", 5.503, 6.000)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  handleclick(){
    alert('clicked');
  }

}
