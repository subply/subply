import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-url-input',
  templateUrl: './url-input.component.html',
  styleUrls: ['./url-input.component.css']
})
export class UrlInputComponent implements OnInit {

  constructor(private router: Router) { 
    this.enterPressed();
  }

  ngOnInit() { }

  enterPressed(){
    window.onkeydown = (event)=>{
      if(event.keyCode === 13){
        return this.goButtonClicked();
      }
    };
  }

  goButtonClicked(){
    
    const url = (<HTMLInputElement>document.getElementById("url")).value;
    let videoId = url.split('=')[1];
    if(!videoId) return alert('올바른 url을 입력 해 주세요!');

    const ampersandPosition = videoId.indexOf('&');
    if(ampersandPosition != -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }
    
    if(!videoId) return alert('올바른 url을 입력 해 주세요!');
    this.router.navigate([`/translate/${videoId}`]);

  }
}
