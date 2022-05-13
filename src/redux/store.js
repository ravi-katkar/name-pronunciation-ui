import { configureStore } from '@reduxjs/toolkit'
import userEntitlementReducer from './reducers/user.entitlement.reducer';
import { searchReducer } from './reducers/search.reducer';

export const store = configureStore({
  reducer: {
    userEntitlement: userEntitlementReducer,
    search: searchReducer
  }
})