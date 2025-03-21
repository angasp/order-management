import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addOrder } from '../../store/order.actions';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent {
  orderForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.orderForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(0.1)]],
    });
  }

  onSubmit() {
    if (this.orderForm.valid) {
      const order: Order = {
        id: '', // ID will be auto-generated in the effect
        productName: this.orderForm.value.productName,
        quantity: this.orderForm.value.quantity,
        pricePerUnit: this.orderForm.value.price,
      };

      this.store.dispatch(addOrder({ order }));
      this.orderForm.reset();
    }
  }

  get productName() {
    return this.orderForm.get('productName');
  }
  get quantity() {
    return this.orderForm.get('quantity');
  }
  get price() {
    return this.orderForm.get('price');
  }
}
