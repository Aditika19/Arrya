import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AuthPayload } from '../../../types/types';
import { Auth_Page_Type } from '../../../constants/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent {
  public form: FormGroup;
  public isFormSubmitted = false;
  public isActionSuccessful: boolean = true;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public onLogin(): void {
    this.isFormSubmitted = true;

    if (this.form.valid) {
      const payload: AuthPayload = {
        username: this.form.value.username,
        password: this.form.value.password,
      };

      this.auth.login(payload).subscribe({
        next: () => {
          console.log('hallo');
          this.auth.saveUserInLocalStorage(payload);
          this.auth.goToAdminPage();
          this.isActionSuccessful = true;
        },
        error: (error) => {
          console.log(error);
          this.isActionSuccessful = false;
        },
      });
    }
  }
}
