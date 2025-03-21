import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orders: Order[] = [];

  getOrders(): Observable<Order[]> {
    return of([
      { id: '1', productName: 'Product 1', quantity: 2, pricePerUnit: 10 },
      { id: '2', productName: 'Product 2', quantity: 3, pricePerUnit: 15 },
    ]); // Mock orders
  }
  

  addOrder(order: Omit<Order, 'id'>): void {
    const newOrder: Order = { ...order, id: this.generateUUID() };
    this.orders.push(newOrder);
  }

  private generateUUID(): string {
    return 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, () =>
      Math.floor(Math.random() * 16).toString(16)
    );
  }
}
