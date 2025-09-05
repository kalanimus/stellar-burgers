import { userSlice, checkAuth, loginUser, logoutUser, getUserOrders, registerUser, updateUser } from '../services/slices/userSlice';
import { TUser, TOrder } from '../utils/types';

const mockUser: TUser = {
  email: 'test@test.com',
  name: 'Test User'
};

const mockOrders: TOrder[] = [
  {
    _id: '1',
    status: 'done',
    name: 'Test Order',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
    number: 12345,
    ingredients: ['1', '2']
  }
];

describe('userSlice', () => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    loading: true,
    orders: []
  };

  describe('checkAuth', () => {
    it('должен устанавливать пользователя и isAuthenticated в true при fulfilled', () => {
      const action = {
        type: checkAuth.fulfilled.type,
        payload: mockUser
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.loading).toBe(false);
    });

    it('должен устанавливать isAuthenticated в false при rejected', () => {
      const action = { type: checkAuth.rejected.type };
      const state = userSlice.reducer(initialState, action);

      expect(state.isAuthenticated).toBe(false);
      expect(state.loading).toBe(false);
    });
  });

  describe('loginUser', () => {
    it('должен устанавливать пользователя и isAuthenticated в true при fulfilled', () => {
      const action = {
        type: loginUser.fulfilled.type,
        payload: mockUser
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.loading).toBe(false);
    });
  });

  describe('logoutUser', () => {
    it('должен очищать пользователя и устанавливать isAuthenticated в false при fulfilled', () => {
      const stateWithUser = {
        ...initialState,
        user: mockUser,
        isAuthenticated: true
      };

      const action = { type: logoutUser.fulfilled.type };
      const state = userSlice.reducer(stateWithUser, action);

      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe('getUserOrders', () => {
    it('должен записывать заказы при fulfilled', () => {
      const action = {
        type: getUserOrders.fulfilled.type,
        payload: mockOrders
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.orders).toEqual(mockOrders);
    });

    it('должен очищать заказы при rejected', () => {
      const stateWithOrders = {
        ...initialState,
        orders: mockOrders
      };

      const action = { type: getUserOrders.rejected.type };
      const state = userSlice.reducer(stateWithOrders, action);

      expect(state.orders).toEqual([]);
    });
  });

  describe('registerUser', () => {
    it('должен устанавливать пользователя и isAuthenticated в true при fulfilled', () => {
      const action = {
        type: registerUser.fulfilled.type,
        payload: mockUser
      };
      const state = userSlice.reducer(initialState, action);

      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
      expect(state.loading).toBe(false);
    });
  });

  describe('updateUser', () => {
    it('должен обновлять данные пользователя при fulfilled', () => {
      const stateWithUser = {
        ...initialState,
        user: mockUser,
        isAuthenticated: true,
        loading: false
      };

      const updatedUser = {
        ...mockUser,
        name: 'Updated User'
      };

      const action = {
        type: updateUser.fulfilled.type,
        payload: updatedUser
      };
      const state = userSlice.reducer(stateWithUser, action);

      expect(state.user).toEqual(updatedUser);
      expect(state.isAuthenticated).toBe(true); // Должно остаться true
    });
  });
});
