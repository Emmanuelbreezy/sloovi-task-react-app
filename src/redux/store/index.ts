import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query'; 

import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { unauthenticatedMiddleware } from '../middleware/error-handling.middleware';
import {authReducer} from './states';
import { REDUX_PERSIST_SECRET } from '../../constant/index';
import { authenticationApi } from './services/authenticationApi.services';
import { taskApis } from './services/taskApis.services';


const encryptor = encryptTransform({
  secretKey: REDUX_PERSIST_SECRET ? REDUX_PERSIST_SECRET : '',
  onError: function (error) {
    //console.log(error);
  },
});

const persistAuthConfig = {
          key: 'auth',
          version: 1,
          storage,
          transforms: [encryptor],
}

const authpersistedReducer = persistReducer(persistAuthConfig, authReducer);

export const store = configureStore({
    reducer:{
        [authenticationApi.reducerPath]: authenticationApi.reducer,
        [taskApis.reducerPath]: taskApis.reducer,
        auth:authpersistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat([
             unauthenticatedMiddleware,   
             authenticationApi.middleware,
             taskApis.middleware
         ]),
  })


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);