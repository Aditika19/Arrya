import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Active_Menu } from '../../constants/constants';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public activeMenu: Active_Menu | undefined;

  public isLoggedIn: boolean;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();

    const url = this.router.url;
    const segments = url.split('/');

    segments.forEach((segment) => {
      switch (segment) {
        case 'admin':
          this.activeMenu = Active_Menu.Admin;
          break;
        case 'auth':
          this.activeMenu = undefined;
          break;
        case 'add-product':
          this.activeMenu = undefined;
          break;
        case 'update-product':
          this.activeMenu = undefined;
          break;
        case 'products':
          this.activeMenu = undefined;
          break;
        case '':
          this.activeMenu = Active_Menu.Home;
          break;
      }
    });
  }

  public onLogout() {
    this.authService.logout();
  }
}
