import { configureStore } from '@reduxjs/toolkit'

import SearchReducer from './searchSlice'
export const store = configureStore({
    reducer: {
        search: SearchReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['search/searchSubmit']
            },
        }),
})

