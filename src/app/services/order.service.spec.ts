import { TestBed } from '@angular/core/testing';
import { OrderService } from './order.service';
import { Order } from '../models/order.model';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getOrders', () => {
    it('should return the list of orders', (done) => {
      service.getOrders().subscribe((orders) => {
        expect(orders.length).toBe(3);
        expect(orders[0].productName).toBe('Product 1');
        done();
      });
    });
  });

  describe('addOrder', () => {
    it('should add a new order and return it', (done) => {
      const newOrder: Order = {
        id: '4',
        productName: 'Product 4',
        quantity: 5,
        pricePerUnit: 12,
        totalPrice: 60,
      };

      service.addOrder(newOrder).subscribe((order) => {
        expect(order).toEqual(newOrder);
        service.getOrders().subscribe((orders) => {
          expect(orders.length).toBe(4);
          expect(orders[3]).toEqual(newOrder);
          done();
        });
      });
    });

    it('should throw an error if the order data is invalid', (done) => {
      const invalidOrder: Order = {
        id: '5',
        productName: '',
        quantity: 0,
        pricePerUnit: -10,
        totalPrice: 0,
      };

      service.addOrder(invalidOrder).subscribe({
        error: (error) => {
          expect(error.message).toBe('Invalid order data');
          done();
        },
      });
    });
  });

  describe('deleteOrder', () => {
    it('should delete an order by ID', (done) => {
      const orderIdToDelete = '1';

      service.deleteOrder(orderIdToDelete).subscribe(() => {
        service.getOrders().subscribe((orders) => {
          expect(orders.length).toBe(2);
          expect(
            orders.find((order) => order.id === orderIdToDelete)
          ).toBeUndefined();
          done();
        });
      });
    });

    it('should throw an error if the order ID does not exist', (done) => {
      const invalidOrderId = '999';

      service.deleteOrder(invalidOrderId).subscribe({
        error: (error) => {
          expect(error.message).toBe('Order not found');
          done();
        },
      });
    });
  });
});
