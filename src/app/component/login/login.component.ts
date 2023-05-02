import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginFormGroup: any;
  submittingForm: boolean = false;
  constructor(private formBuilder:FormBuilder) {
  }
  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      email: new FormControl('',
        [Validators.required, Validators.email]
      ),
      password: new FormControl('',
        [Validators.required, Validators.minLength(6), Validators.maxLength(32)]
      )
    });
  }

  handleLogin() {
    this.submittingForm = true;
  }
  get email() { return this.loginFormGroup.get('email') }
  get password() { return this.loginFormGroup.get('password') }
}
