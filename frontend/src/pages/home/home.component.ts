import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../../libs/components/layout/layout.component';
import { RouterOutlet } from '@angular/router';
import { ProductsComponent } from '../../libs/components/products/products.component';
import { PageType } from '../../libs/types/types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LayoutComponent, RouterOutlet, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  protected readonly PageType = PageType;
}
