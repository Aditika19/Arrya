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
import { RouterLink } from '@angular/router';
import { LayoutComponent } from '../../../libs/components/layout/layout.component';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LayoutComponent],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public isFormSubmitted = false;

  public isLoading: boolean = false;
  public isAddProductSuccessful: boolean;
  public showForm = true;

  public addedFileSource: File;

  public component$: Subject<void> = new Subject();

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      price: [null, [Validators.required]],
      status: [false],
      description: ['', [Validators.required]],
      file: [null, [Validators.required]],
      fileSource: [null],
    });
  }

  ngOnDestroy() {
    this.component$.next();
    this.component$.complete();
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        fileSource: file,
      });

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.addedFileSource = e.target.result;
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
      formData.append('image', this.form.get('fileSource')?.value);
      formData.append('status', this.form.get('status')?.value);

      this.productsService
        .addProduct(formData)
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
