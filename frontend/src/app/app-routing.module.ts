import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { productResolver } from '../libs/resolvers/product-resolver';
import { isLoggedInGuard } from '../libs/guards/is-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../pages/home/home.component').then((mod) => mod.HomeComponent),
  },
  {
    path: 'products/:productId',
    loadComponent: () =>
      import('../libs/components/product/product.component').then(
        (mod) => mod.ProductComponent
      ),
    resolve: { product: productResolver },
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('../pages/admin/admin.component').then(
        (mod) => mod.AdminComponent
      ),
    canActivate: [isLoggedInGuard],
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('../libs/components/auth/login/login.component').then(
        (mod) => mod.LoginComponent
      ),
  },
  {
    path: 'admin/add-product',
    loadComponent: () =>
      import('../pages/admin/add-product/add-product.component').then(
        (mod) => mod.AddProductComponent
      ),
  },
  {
    path: 'admin/update-product/:productId',
    loadComponent: () =>
      import('../pages/admin/update-product/update-product.component').then(
        (mod) => mod.UpdateProductComponent
      ),
    resolve: { product: productResolver },
  },
  {
    path: '**',
    loadComponent: () =>
      import('../libs/components/notfound/notfound.component').then(
        (mod) => mod.NotfoundComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
