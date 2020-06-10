import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../../service/login.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private route: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("id")) this.route.navigate(['/']);
  }

  onSubmit(loginForm: NgForm) {
    const { id, password } = loginForm.value;
    this.loginService.login(id, password)
      .subscribe(data => {
        if(!data.login) return alert('login failed');
        this.loginService.setLocalStorage(id);
        window.location.reload();
      });
  }


}
