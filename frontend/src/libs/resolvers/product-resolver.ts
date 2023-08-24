import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { Product } from '../types/types';
import { catchError, Observable, of, throwError } from 'rxjs';

export const productResolver: (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => Observable<Product | null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(ProductsService)
    .getProductById(route.paramMap.get('productId')!)
    .pipe(
      catchError((): Observable<any> => {
        return of(null);
      })
    );
};
