import { configureStore } from '@reduxjs/toolkit'
import userEntitlementReducer from './reducers/user.entitlement.reducer';
import { searchReducer } from './reducers/search.reducer';
import { commonReducer } from './reducers/common.reducer';

export const store = configureStore({
  reducer: {
    userEntitlement: userEntitlementReducer,
    search: searchReducer,
    common: commonReducer
  }
})