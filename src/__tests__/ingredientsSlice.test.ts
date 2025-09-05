import { ingredientsSlice, fetchIngredients } from '../services/slices/ingredientsSlice';
import { TIngredient } from '../utils/types';

const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'image.png',
    image_mobile: 'image_mobile.png',
    image_large: 'image_large.png'
  }
];

describe('ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  it('должен устанавливать loading в true при pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен записывать данные и устанавливать loading в false при fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });

  it('должен записывать ошибку и устанавливать loading в false при rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка сети' }
    };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка сети');
  });
});
