import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrderService } from '../services/order.service';
import * as OrderActions from './order.actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrderEffects {
  constructor(private actions$: Actions, private orderService: OrderService) {}

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.loadOrders),
      switchMap(() =>
        this.orderService.getOrders().pipe(
          map((orders) => OrderActions.loadOrdersSuccess({ orders })),
          catchError((error) =>
            of(OrderActions.loadOrdersFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.addOrder),
      switchMap(({ order }) => {
        const newOrder = { ...order, id: uuidv4() };
        return this.orderService.addOrder(newOrder).pipe(
          map(() => OrderActions.addOrderSuccess({ order: newOrder })),
          catchError((error) =>
            of(OrderActions.addOrderFailure({ error: error.message }))
          )
        );
      })
    )
  );

  // Delete Order
  deleteOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.deleteOrder),
      switchMap(({ orderId }) =>
        this.orderService.deleteOrder(orderId).pipe(
          map(() => OrderActions.deleteOrderSuccess({ orderId })),
          catchError((error) =>
            of(OrderActions.deleteOrderFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
