import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


interface IUser {
    id: number;
    name : string;
    email : string
}

const initialState : {
    listUsers : IUser[]
} = {
  listUsers: [],
}
export const fetchListUser= createAsyncThunk(
    'users/fetchByIdStatus',
    async (userId, thunkAPI) => {
            const res = await fetch("http://localhost:8000/users");
            const data = await res.json();
      return data
    }
)

export const userSlide = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListUser.fulfilled, (state, action) => {

    state.listUser = action.payload;

    })
  },
})


export default userSlide.reducer