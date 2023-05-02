import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RepeatPasswordMatcher} from "../../common/repeat-password-matcher";
import {UserSignup} from "../../model/user-signup";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  signupFormGroup: FormGroup;

  constructor(	private router: Router,
                private formBuilder: FormBuilder,
                private matSnackbar: MatSnackBar,
                private authService:AuthService) {
  }
  repeatPasswordMatcher = new RepeatPasswordMatcher();
  ngOnInit(): void {
    this.signupFormGroup = this.formBuilder.group({
      infoGroup: this.formBuilder.group({
        firstName: new FormControl('',
          [Validators.required, Validators.maxLength(64)]
        ),
        lastName: new FormControl('',
          [Validators.required, Validators.maxLength(64)]
        ),
        email: new FormControl('',
          [Validators.required, Validators.email, Validators.maxLength(64)]
        )
      }),
      passwordGroup: this.formBuilder.group({
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
        passwordRepeat: new FormControl('', [Validators.required])
      })
    }, { validators: this.matchPasswords });
  }
  matchPasswords: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
    const password = group.get('passwordGroup.password').value;
    const passwordRepeat = group.get('passwordGroup.passwordRepeat').value;
    return password === passwordRepeat ? null : { passwordMissMatch: true }
  }
  submittingForm: boolean = false;
  get firstName() { return this.signupFormGroup.get('infoGroup.firstName') }
  get lastName() { return this.signupFormGroup.get('infoGroup.lastName') }
  get email() { return this.signupFormGroup.get('infoGroup.email') }
  get password() { return this.signupFormGroup.get('passwordGroup.password') }
  get passwordRepeat() { return this.signupFormGroup.get('passwordGroup.passwordRepeat') }


  handleSignup() {
    if(this.signupFormGroup.valid){
      this.submittingForm = true;
      const userSignup = new UserSignup();
      userSignup.name = this.firstName?.value;
      userSignup.surname = this.lastName?.value;
      userSignup.username = this.email?.value;
      userSignup.password = this.password?.value;
      this.authService.signup(userSignup).subscribe((res)=>{
        console.log(res)
      },error => {
        console.log(error)
      })
    }
  }
}
