import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from './confirmPasswordValidator';
import { LoginService } from '../../../service/login.service'
@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  @Input() isDuplicated: boolean
  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.isDuplicated = true;
  }

  ngOnInit(): void { }
  
  idPattern = "[-_!A-za-z0-9]{4,10}$";
  passwordPattern = "[-_!A-za-z0-9]{4,10}$";

  joinForm = this.fb.group({
    profileImage: [''],
    id: ['', [Validators.required, Validators.pattern(this.idPattern)]],
    password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
    password_check: ['', Validators.required],
    name: ['', Validators.required],
    nickname: ['', Validators.required],
    checkId : ['Check Duplicate']
  }, {validators : ConfirmPasswordValidator.MatchPassword});

  checkDuplicateID(){
    const id = this.joinForm.value.id;
    this.loginService.getUser(id).subscribe(
      (user) => {
        if(!user) {
          this.isDuplicated = false;
          return this.joinFormControl['checkId'].setErrors(null);
        }
        return this.joinFormControl['checkId'].setErrors({"invalid" : true});
      }
    );
  }
  
  get joinFormControl() {
    return this.joinForm.controls;
  }

  onSubmit(){
    
    const {id, password, password_check, name, nickname} = this.joinForm.value;
    console.log(id, password);
  }
}
