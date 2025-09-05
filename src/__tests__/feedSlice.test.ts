import { feedSlice, getFeeds } from '../services/slices/feedSlice';
import { TOrder } from '../utils/types';

const mockFeedData = {
  orders: [
    {
      _id: '1',
      status: 'done',
      name: 'Test Order',
      createdAt: '2025-01-01',
      updatedAt: '2025-01-01',
      number: 12345,
      ingredients: ['1', '2']
    }
  ] as TOrder[],
  total: 100,
  totalToday: 10
};

describe('feedSlice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false
  };

  describe('getFeeds', () => {
    it('должен устанавливать loading в true при pending', () => {
      const action = { type: getFeeds.pending.type };
      const state = feedSlice.reducer(initialState, action);

      expect(state.loading).toBe(true);
    });

    it('должен записывать данные ленты и устанавливать loading в false при fulfilled', () => {
      const action = {
        type: getFeeds.fulfilled.type,
        payload: mockFeedData
      };
      const state = feedSlice.reducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.orders).toEqual(mockFeedData.orders);
      expect(state.total).toBe(mockFeedData.total);
      expect(state.totalToday).toBe(mockFeedData.totalToday);
    });

    it('должен устанавливать loading в false при rejected', () => {
      const stateWithLoading = {
        ...initialState,
        loading: true
      };

      const action = { type: getFeeds.rejected.type };
      const state = feedSlice.reducer(stateWithLoading, action);

      expect(state.loading).toBe(false);
    });
  });
});
