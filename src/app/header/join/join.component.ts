import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from './confirmPasswordValidator';
import { UserService } from '../../../service/user.service'
@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  @Input() isDuplicated: boolean
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.isDuplicated = true;
  }

  ngOnInit(): void { }
  
  idPattern = "[-_!A-za-z0-9]{4,10}$";
  passwordPattern = "[-_!A-za-z0-9]{4,10}$";
  imageSrc: any = "https://img.icons8.com/ios-filled/100/000000/name.png";
  joinForm = this.fb.group({
    profileImage: [''],
    id: ['', [Validators.required, Validators.pattern(this.idPattern)]],
    password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
    password_check: ['', Validators.required],
    name: ['', Validators.required],
    nickname: ['', Validators.required],
    checkId : ['Check Duplicate'],
    profilePhoto: ['']
  }, {validators : ConfirmPasswordValidator.MatchPassword});

  
  checkDuplicateID(){
    const id = this.joinForm.value.id;
    this.userService.getUser(id).subscribe(
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


  onSubmit(){    
    const {id, password, profilePhoto, password_check, name, nickname} = this.joinForm.value;
    console.log(profilePhoto);
  }
}
