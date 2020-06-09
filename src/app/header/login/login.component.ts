import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import config from '../../../config/config.json';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(config.server_url);
  }
  onSubmit(loginForm: NgForm){
    console.log(loginForm);
  }

}
