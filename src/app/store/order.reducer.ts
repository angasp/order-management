import { createReducer, on } from '@ngrx/store';
import { Order } from '../models/order.model';
import * as OrderActions from './order.actions';

export interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

export const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

export const orderReducer = createReducer(
  initialState,
  on(OrderActions.loadOrders, (state) => ({ ...state, loading: true })),
  on(OrderActions.loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    loading: false,
    orders,
  })),
  on(OrderActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(OrderActions.addOrder, (state) => ({
    ...state,
    loading: true,
  })),
  on(OrderActions.addOrderSuccess, (state, { order }) => ({
    ...state,
    loading: false,
    orders: [...state.orders, order],
  })),
  on(OrderActions.addOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(OrderActions.deleteOrderSuccess, (state, { orderId }) => ({
    ...state,
    orders: state.orders.filter((order) => order.id !== orderId),
  })),
  on(OrderActions.deleteOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);