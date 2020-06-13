import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  onSubmit(joinForm : NgForm){
    const {id, password, name, nickname} = joinForm.value;
    
  }
}
