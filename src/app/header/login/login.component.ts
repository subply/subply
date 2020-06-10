import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../../service/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogined : boolean
  constructor(private loginService: LoginService) { 
    this.isLogined = false;
  }

  ngOnInit(): void { }

  onSubmit(loginForm: NgForm){
    const {id, password} = loginForm.value;    
    this.loginService.login(id, password)
    .subscribe(data=> data.login? this.isLogined = true : this.isLogined = false);

  }


}
