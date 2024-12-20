import { configureStore } from '@reduxjs/toolkit'

import counterReduce from './counter/counter.slide'
import useReducer from './user/user.slide'

// redux store
export const store = configureStore({
  reducer: {
    counter : counterReduce,
    user : useReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch