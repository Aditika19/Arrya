import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { LayoutComponent } from '../layout/layout.component';
import { ProductsService } from '../../services/products.service';
import { Subject, takeUntil } from 'rxjs';
import { PageType, Product, ProductTypes } from '../../types/types';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, LayoutComponent, NgOptimizedImage, RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  @Input() public pageType: PageType;
  public products: Product[];
  public onlineProducts: Product[];
  public backendImagesContentUrl = environment.backendImagesContentUrl;
  public PageType = PageType;

  public selectedProducts: ProductTypes = ProductTypes.All;
  public filteredProducts: Product[];

  public ProductTypes = ProductTypes;

  public component$: Subject<void> = new Subject();
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.productsService
      .getAllProducts()
      .pipe(takeUntil(this.component$))
      .subscribe((response: Product[]) => {
        this.products = [...response];
        this.onlineProducts = response.filter(
          (product) => product.status === true
        );
        this.filteredProducts = [...this.onlineProducts];
      });
  }

  public ngOnDestroy() {
    this.component$.next();
    this.component$.complete();
  }

  public goToProductDetailPage(id: string) {
    if (this.pageType === PageType.Home) {
      this.router.navigate(['/products/', id]);
    }
  }

  public deleteHandler(id: string) {
    this.productsService
      .deleteProduct(id)
      .pipe(takeUntil(this.component$))
      .subscribe({
        next: (response: Product) => {
          this.productsService
            .getAllProducts()
            .pipe(takeUntil(this.component$))
            .subscribe((response: Product[]) => {
              this.products = [...response];
            });
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  public showAllProducts() {
    this.filteredProducts = [...this.onlineProducts];
    this.selectedProducts = ProductTypes.All;
  }

  public showMenProducts() {
    this.filteredProducts = this.onlineProducts.filter(
      (product) => product.category === ProductTypes.Men
    );
    this.selectedProducts = ProductTypes.Men;
  }

  public showWomenProducts() {
    this.filteredProducts = this.onlineProducts.filter(
      (product) => product.category === ProductTypes.Women
    );
    this.selectedProducts = ProductTypes.Women;
  }

  public showChildrenProducts() {
    this.filteredProducts = this.onlineProducts.filter(
      (product) => product.category === ProductTypes.children
    );
    this.selectedProducts = ProductTypes.children;
  }

  public showMiscellaneousProducts() {
    this.filteredProducts = this.onlineProducts.filter(
      (product) => product.category === ProductTypes.Miscellaneous
    );
    this.selectedProducts = ProductTypes.Miscellaneous;
  }
}
