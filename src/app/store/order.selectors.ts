import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from './order.reducer';

// Select order state
export const selectOrderState = createFeatureSelector<OrderState>('orders');

// Select all orders
export const selectAllOrders = createSelector(
  selectOrderState,
  (state) => state.orders
);

// Select loading state
export const selectLoading = createSelector(
  selectOrderState,
  (state) => state.loading
);

// Select error state
export const selectError = createSelector(
  selectOrderState,
  (state) => state.error
);

// Select total price of all orders
export const selectTotalPrice = createSelector(
  selectOrderState,
  (state) =>
    state.orders.reduce((total, order) => total + order.quantity * order.pricePerUnit, 0)
);

// Select a specific order by ID
export const selectOrderById = (orderId: string) =>
  createSelector(
    selectOrderState,
    (state) => state.orders.find((order) => order.id === orderId)
  );