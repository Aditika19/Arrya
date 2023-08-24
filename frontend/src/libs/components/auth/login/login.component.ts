import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../../layout/layout.component';
import { RouterLink } from '@angular/router';
import { AuthFormComponent } from '../auth-form/auth-form.component';
import { PageType } from '../../../types/types';
import { Auth_Page_Type } from '../../../constants/constants';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, LayoutComponent, RouterLink, AuthFormComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  protected readonly Auth_Page_Type = Auth_Page_Type;
}
