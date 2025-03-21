import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { orderReducer } from '../store/order.reducer';
import { OrderEffects } from '../store/order.effects';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderListComponent } from './order-list/order-list.component';

@NgModule({
  declarations: [
    OrderFormComponent,
    OrderListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('orders', orderReducer),
    EffectsModule.forFeature([OrderEffects])
  ],
  exports: [
    OrderFormComponent,
    OrderListComponent
  ]
})
export class OrderModule {}
