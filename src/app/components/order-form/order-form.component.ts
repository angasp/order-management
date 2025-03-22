import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addOrder } from '../../store/order.actions';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
})
export class OrderFormComponent implements OnInit {
  orderForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(3)]],
      quantity: [
        '',
        [Validators.required, Validators.pattern('^[1-9][0-9]*$')],
      ],
      pricePerUnit: [
        '',
        [
          Validators.required,
          Validators.pattern('^\\d+(\\.\\d+)?$'), // Regex for valid decimal numbers
        ],
      ],
    });
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const order: Omit<Order, 'id'> = this.orderForm.value;
      this.store.dispatch(addOrder({ order }));
      this.orderForm.reset(); 
      console.log("Order Submitted:", order);
    } else {
      console.log("Form is invalid, cannot submit.");
    }
  }

  get productName() {
    return this.orderForm.get('productName');
  }

  get quantity() {
    return this.orderForm.get('quantity');
  }

  get pricePerUnit() {
    return this.orderForm.get('pricePerUnit');
  }
}