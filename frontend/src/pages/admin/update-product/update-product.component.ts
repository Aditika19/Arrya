import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductsService } from '../../../libs/services/products.service';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../../libs/types/types';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LayoutComponent } from '../../../libs/components/layout/layout.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LayoutComponent],
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit, OnDestroy {
  public product: Product;
  public form: FormGroup;
  public isFormSubmitted = false;

  public backendImagesContentUrl = environment.backendImagesContentUrl;

  public isLoading: boolean = false;
  public isAddProductSuccessful: boolean;
  public showForm = true;

  public updatedFileSource: File;

  public component$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ product }) => {
      if (product) {
        this.product = {
          ...product,
        };

        this.form = this.fb.group({
          name: [this.product.name, [Validators.required]],
          category: [this.product.category, [Validators.required]],
          price: [this.product.price, [Validators.required]],
          status: [this.product.status],
          description: [this.product.description, [Validators.required]],
          file: [null],
          fileSource: [null],
        });
      } else {
        this.router.navigate(['/oops']);
      }
    });
  }

  public ngOnDestroy() {
    this.component$.next();
    this.component$.complete();
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        fileSource: file,
      });

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.updatedFileSource = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  public onSubmit(): void {
    this.isFormSubmitted = true;

    if (this.form.valid) {
      this.isLoading = true;

      const formData: FormData = new FormData();
      formData.append('name', this.form.get('name')?.value);
      formData.append('category', this.form.get('category')?.value);
      formData.append('description', this.form.get('description')?.value);
      formData.append('price', this.form.get('price')?.value);
      if (this.form.get('fileSource')?.value) {
        formData.append('image', this.form.get('fileSource')?.value);
      }
      formData.append('status', this.form.get('status')?.value);

      this.productsService
        .updateProduct(this.product.id, formData)
        .pipe(takeUntil(this.component$))
        .subscribe({
          next: (response: Product) => {
            this.isLoading = false;
            this.isAddProductSuccessful = true;
            this.showForm = false;
          },
          error: (error) => {
            this.isLoading = false;
            this.isAddProductSuccessful = false;
          },
        });
    }
  }
}
