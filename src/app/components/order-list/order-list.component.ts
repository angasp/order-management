import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllOrders, selectError, selectLoading, selectTotalPrice } from '../../store/order.selectors';
import { Order } from '../../models/order.model';
import { loadOrders, deleteOrder } from 'src/app/store/order.actions';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orders$: Observable<Order[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  totalPrice$: Observable<number>;

  constructor(private store: Store) {
    this.orders$ = this.store.select(selectAllOrders);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.totalPrice$ = this.store.select(selectTotalPrice);
  }

  ngOnInit(): void {
    this.store.dispatch(loadOrders());
  }

  deleteOrder(orderId: string): void {
    this.store.dispatch(deleteOrder({ orderId }));
  }
}