import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogined : boolean
  constructor(private route: Router) {
    this.isLogined = sessionStorage.getItem("id")? true : false;
  }

  ngOnInit() {
  }

  login(){
    this.route.navigate(['/login']);
  }

  logout(){
    sessionStorage.removeItem("id");
    window.location.reload();
  }

  join(){
    this.route.navigate(['/join']);
  }


}
