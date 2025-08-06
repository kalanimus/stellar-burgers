import { combineReducers } from '@reduxjs/toolkit';

// Импорты слайсов (добавите когда создадите)
import constructorReducer from './slices/constructorSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
  burgerConstructor: constructorReducer,
  ingredients: ingredientsReducer,
  user: userReducer,
});

export default rootReducer;
