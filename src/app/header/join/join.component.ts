import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, Form } from '@angular/forms';
import { ConfirmPasswordValidator } from './confirmPasswordValidator';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  @Input() isDuplicated: boolean
  constructor(private fb: FormBuilder, 
    private userService: UserService,
    private router: Router) {
    this.isDuplicated = true;
  }

  ngOnInit(): void { }
  
  idPattern = "[-_!A-za-z0-9]{4,10}$";
  passwordPattern = "[-_!A-za-z0-9]{4,10}$";
  imageSrc: any = "https://img.icons8.com/ios-filled/100/000000/name.png";

  joinForm = this.fb.group({
    profilePhoto: [''],
    id: ['', [Validators.required, Validators.pattern(this.idPattern)]],
    password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
    password_check: ['', Validators.required],
    name: ['', Validators.required],
    nickname: ['', Validators.required],
    checkId : ['Check Duplicate'],
  }, {validators : ConfirmPasswordValidator.MatchPassword});

  
  checkDuplicateID(){
    const id = this.joinForm.value.id;
    this.userService.getUser(id).subscribe((user) => {
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

  onFileChange(files: FileList) {
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result;
      };

      this.joinFormControl['profilePhoto'].setValue(file.name);
    }
  }


  onSubmit(files: FileList){    
    const {id, password_check, name, nickname} = this.joinForm.value;
    const profilePhoto = new Blob([files[0]], {type: 'text/plain'});

    const newUser = {
      id,
      password_check,
      name,
      nickname,
      profilePhoto
    }

    this.userService.addUser(newUser).subscribe((ret)=>{
      if(!ret) {alert('회원가입 실패'); return false;}
      alert('회원가입 성공!');
      this.router.navigate(['/']);
    });
  }
}
