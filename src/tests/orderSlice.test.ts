import { orderSlice, createOrder, cleanModalData } from '../services/slices/orderSlice';
import { TOrder } from '../utils/types';

const mockOrder: TOrder = {
  _id: '1',
  status: 'done',
  name: 'Test Order',
  createdAt: '2023-01-01',
  updatedAt: '2023-01-01',
  number: 12345,
  ingredients: ['1', '2']
};

describe('orderSlice', () => {
  const initialState = {
    order: null,
    orderRequest: false,
    orderModalData: null
  };

  describe('createOrder', () => {
    it('должен устанавливать orderRequest в true при pending', () => {
      const action = { type: createOrder.pending.type };
      const state = orderSlice.reducer(initialState, action);

      expect(state.orderRequest).toBe(true);
    });

    it('должен записывать заказ и устанавливать orderRequest в false при fulfilled', () => {
      const action = {
        type: createOrder.fulfilled.type,
        payload: mockOrder
      };
      const state = orderSlice.reducer(initialState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.order).toEqual(mockOrder);
      expect(state.orderModalData).toEqual(mockOrder);
    });

    it('должен устанавливать orderRequest в false при rejected', () => {
      const stateWithRequest = {
        ...initialState,
        orderRequest: true
      };

      const action = { type: createOrder.rejected.type };
      const state = orderSlice.reducer(stateWithRequest, action);

      expect(state.orderRequest).toBe(false);
    });
  });

  describe('cleanModalData', () => {
    it('должен очищать orderModalData', () => {
      const stateWithModalData = {
        ...initialState,
        orderModalData: mockOrder
      };

      const action = cleanModalData();
      const state = orderSlice.reducer(stateWithModalData, action);

      expect(state.orderModalData).toBeNull();
    });
  });
});
