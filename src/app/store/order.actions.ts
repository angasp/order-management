import { createAction, props } from '@ngrx/store';
import { Order } from '../models/order.model';

// Load Orders
export const loadOrders = createAction('[Order] Load Orders');

// Load Orders Success
export const loadOrdersSuccess = createAction(
  '[Order] Load Orders Success',
  props<{ orders: Order[] }>()
);

// Load Orders Failure
export const loadOrdersFailure = createAction(
  '[Order] Load Orders Failure',
  props<{ error: string }>()
);

// Add Order
export const addOrder = createAction(
  '[Order] Add Order',
  props<{ order: Omit<Order, 'id'> }>() // Exclude 'id' since it's auto-generated
);

// Add Order Success
export const addOrderSuccess = createAction(
  '[Order] Add Order Success',
  props<{ order: Order }>()
);

// Add Order Failure
export const addOrderFailure = createAction(
  '[Order] Add Order Failure',
  props<{ error: string }>()
);

// Delete Order
export const deleteOrder = createAction(
  '[Order] Delete Order',
  props<{ orderId: string }>()
);

// Delete Order Success
export const deleteOrderSuccess = createAction(
  '[Order] Delete Order Success',
  props<{ orderId: string }>()
);

// Delete Order Failure
export const deleteOrderFailure = createAction(
  '[Order] Delete Order Failure',
  props<{ error: string }>()
);
