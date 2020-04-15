import { createStore, combineReducers } from 'redux';

import user from './reducers/user.js';
import items from './reducers/items';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

///import rootReducer from './reducers'; // the value from combineReducers


const rootReducer = 
    combineReducers({
        user,
        items
    });

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};



const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store);
