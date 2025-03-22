import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderListComponent } from './components/order-list/order-list.component';

export const ROUTES = {
  CREATE_ORDER: 'create-order',
  VIEW_ORDERS: 'view-orders',
};

const routes: Routes = [
  { path: ROUTES.CREATE_ORDER, component: OrderFormComponent },
  { path: ROUTES.VIEW_ORDERS, component: OrderListComponent },
  { path: '', redirectTo: ROUTES.CREATE_ORDER, pathMatch: 'full' },
  { path: '**', redirectTo: ROUTES.CREATE_ORDER }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
