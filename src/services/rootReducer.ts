import { combineSlices } from '@reduxjs/toolkit';
import { constructorSlice } from './slices/constructorSlice';
import { ingredientsSlice } from './slices/ingredientsSlice';
import { userSlice } from './slices/userSlice';
import { orderSlice } from './slices/orderSlice';
import { feedSlice } from './slices/feedSlice';

const rootReducer = combineSlices(
  constructorSlice,
  ingredientsSlice,
  userSlice,
  orderSlice,
  feedSlice
);

export default rootReducer;
