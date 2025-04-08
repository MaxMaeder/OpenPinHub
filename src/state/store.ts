import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sourcesReducer from "./slices/sourcesSlice";
import installersReducer from "./slices/installersSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const sourcesPersistConfig = {
  key: "sources",
  storage,
};

const rootReducer = combineReducers({
  sources: persistReducer(sourcesPersistConfig, sourcesReducer),
  installers: installersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
