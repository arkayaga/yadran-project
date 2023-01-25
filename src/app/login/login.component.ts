import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    if (!this.form.valid) {
      return;
    }

    const request = {
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value,
    }

    this.authService.login(request).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }



}
