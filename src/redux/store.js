import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cityReducer from "./citySlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authApi } from "./authApi";
import { serviceApi } from "./serviceApi";
import { categoryApi } from "./categoryApi";
import { searchApi } from "./searchApi";
import { providerApi } from "./providerApi";
import { providerServiceApi } from "./providerServiceApi";
import { userApi } from "./userApi";
import { walletApi } from "./walletApi";
import { notificationApi } from "./notificationApi";
import { providerResponseApi } from "./providerResponseApi";
import { serviceRequestApi } from "./serviceRequestApi";
import { bookingApi } from "./bookingApi";
import { paymentApi } from "./paymentApi";
import { reviewApi } from "./reviewApi";
import { adminDashboardApi } from "./adminDashboardApi";

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    city: cityReducer,
    [authApi.reducerPath]: authApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [providerApi.reducerPath]: providerApi.reducer,
    [providerServiceApi.reducerPath]: providerServiceApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
    [providerResponseApi.reducerPath]: providerResponseApi.reducer,
    [serviceRequestApi.reducerPath]: serviceRequestApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [adminDashboardApi.reducerPath]: adminDashboardApi.reducer,
});

// Persist auth and city slices
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "city"],
};

// Wrap combined reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE", "persist/PURGE"],
            },
        }).concat(authApi.middleware, serviceApi.middleware, categoryApi.middleware, searchApi.middleware, providerApi.middleware, providerServiceApi.middleware, userApi.middleware, walletApi.middleware, notificationApi.middleware, providerResponseApi.middleware, serviceRequestApi.middleware, bookingApi.middleware, paymentApi.middleware, reviewApi.middleware, adminDashboardApi.middleware),
});

export const persistor = persistStore(store);
