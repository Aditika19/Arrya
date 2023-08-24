import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss'],
  imports: [],
})
export class NotfoundComponent {
  constructor(private router: Router) {}
  public gotoHomePage() {
    this.router.navigate(['/']);
  }
}
