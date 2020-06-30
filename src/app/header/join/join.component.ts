import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from './confirmPasswordValidator';
@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void { }
  idPattern = "[-_!A-za-z0-9]{4,10}$";
  passwordPattern = "[-_!A-za-z0-9]{4,10}$";

  joinForm = this.fb.group({
    profileImage: [''],
    id: ['', [Validators.required, Validators.pattern(this.idPattern)]],
    password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
    password_check: ['', Validators.required],
    name: ['', Validators.required],
    nickname: ['', Validators.required]
  }, {validators : ConfirmPasswordValidator.MatchPassword});

  onSubmit(){
    const {id, password, password_check, name, nickname} = this.joinForm.value;
    console.log(password, password_check);
  }
}
