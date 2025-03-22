import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Order } from '../models/order.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orders: Order[] = [
    { id: '1', productName: 'Product 1', quantity: 2, pricePerUnit: 10, totalPrice: 20 },
    { id: '2', productName: 'Product 2', quantity: 3, pricePerUnit: 15, totalPrice: 45 },
    { id: '3', productName: 'Product 3', quantity: 1, pricePerUnit: 20, totalPrice: 20 },
  ];

  getOrders(): Observable<Order[]> {
    return of(this.orders).pipe(delay(500)); // Simulate API delay
  }

  addOrder(order: Order): Observable<Order> {
    if (!order.productName || order.quantity <= 0 || order.pricePerUnit <= 0) {
      return throwError(() => new Error('Invalid order data'));
    }
    this.orders.push(order);
    return of(order).pipe(delay(500)); // Simulate API delay
  }

  deleteOrder(orderId: string): Observable<void> {
    const orderExists = this.orders.find((order) => order.id === orderId);
    if (!orderExists) {
      return throwError(() => new Error('Order not found'));
    }
    this.orders = this.orders.filter((order) => order.id !== orderId);
    return of(undefined).pipe(delay(500)); // Simulate API delay
  }
}