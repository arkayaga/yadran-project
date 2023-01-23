import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;


  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router) {

    this.initForm();
  }



  initForm() {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }


  onSubmit() {
    console.log(this.form);
    if (!this.form.valid) {
      return;
    }

    const request = {
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value,
    }

    this.authService.login(request).subscribe(response => {
      console.log(response)
      this.router.navigate(['/home']);
    });
  }



}
