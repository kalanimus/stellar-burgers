import { constructorSlice, addIngredient, removeIngredient, moveIngredientUp, moveIngredientDown } from '../services/slices/constructorSlice';
import { TIngredient } from '../utils/types';

const mockBun: TIngredient = {
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
};

const mockIngredient: TIngredient = {
  _id: '2',
  name: 'Котлета',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'image.png',
  image_mobile: 'image_mobile.png',
  image_large: 'image_large.png'
};

describe('constructorSlice', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  it('должен добавлять булку', () => {
    const action = addIngredient(mockBun);
    const state = constructorSlice.reducer(initialState, action);

    expect(state.bun).toMatchObject(mockBun);
    expect(state.ingredients).toEqual([]);
  });

  it('должен добавлять ингредиент', () => {
    const action = addIngredient(mockIngredient);
    const state = constructorSlice.reducer(initialState, action);

    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject({
      ...mockIngredient,
      id: expect.any(String)
    });
  });

  it('должен удалять ингредиент', () => {
    const stateWithIngredient = {
      bun: null,
      ingredients: [{ ...mockIngredient, id: 'test-id' }]
    };

    const action = removeIngredient('test-id');
    const state = constructorSlice.reducer(stateWithIngredient, action);

    expect(state.ingredients).toHaveLength(0);
  });

  it('должен перемещать ингредиент вверх', () => {
    const ingredient1 = { ...mockIngredient, id: 'id1', name: 'Первый' };
    const ingredient2 = { ...mockIngredient, id: 'id2', name: 'Второй' };
    
    const stateWithIngredients = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };

    const action = moveIngredientUp(1);
    const state = constructorSlice.reducer(stateWithIngredients, action);

    expect(state.ingredients[0].name).toBe('Второй');
    expect(state.ingredients[1].name).toBe('Первый');
  });

  it('должен перемещать ингредиент вниз', () => {
    const ingredient1 = { ...mockIngredient, id: 'id1', name: 'Первый' };
    const ingredient2 = { ...mockIngredient, id: 'id2', name: 'Второй' };
    
    const stateWithIngredients = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };

    const action = moveIngredientDown(0);
    const state = constructorSlice.reducer(stateWithIngredients, action);

    expect(state.ingredients[0].name).toBe('Второй');
    expect(state.ingredients[1].name).toBe('Первый');
  });
});
