import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../../libs/components/layout/layout.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    LayoutComponent,
    RouterLink,
    RouterOutlet,
    AdminHomeComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {}
