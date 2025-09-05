import rootReducer from '../services/rootReducer';
import { configureStore } from '@reduxjs/toolkit';

describe('rootReducer', () => {
  it('должен правильно инициализироваться', () => {
    const store = configureStore({
      reducer: rootReducer
    });

    const state = store.getState();

    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('order');
    expect(state).toHaveProperty('feed');

    expect(state.burgerConstructor).toEqual({
      bun: null,
      ingredients: []
    });

    expect(state.ingredients).toEqual({
      ingredients: [],
      loading: false,
      error: null
    });
  });

  it('должен возвращать начальное состояние при неизвестном экшене', () => {
  const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
  
  expect(state).toEqual({
    burgerConstructor: { bun: null, ingredients: [] },
    ingredients: { ingredients: [], loading: false, error: null },
    user: { user: null, isAuthenticated: false, loading: true, orders: [] },
    order: { order: null, orderRequest: false, orderModalData: null },
    feed: { orders: [], total: 0, totalToday: 0, loading: false }
  });
});

});
