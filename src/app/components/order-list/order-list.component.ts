import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllOrders } from '../../store/order.selectors';
import { Order } from '../../models/order.model';
import { loadOrders } from 'src/app/store/order.actions';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  orders$: Observable<Order[]>;

  constructor(private store: Store) {
    this.orders$ = this.store.select(selectAllOrders);
  }

  ngOnInit(): void {
    this.store.dispatch(loadOrders());
  }
}
