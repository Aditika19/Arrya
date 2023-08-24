import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../layout/layout.component';
import { PageType, Product } from '../../types/types';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, LayoutComponent],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public product: Product;

  public backendImagesContentUrl = environment.backendImagesContentUrl;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ product }) => {
      if (product) {
        this.product = {
          ...product,
        };
      } else {
        this.router.navigate(['/oops']);
      }
    });
  }
}
