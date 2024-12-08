import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


interface IUser {
    id: number;
    name : string;
    email : string
}
interface IUserPayLoad {
    name : string;
    email : string
}
const initialState : {
    listUsers : IUser[],
    isCreateSuccess :boolean
} = {
  listUsers: [],
  isCreateSuccess : false
}
export const fetchListUsers= createAsyncThunk(
    'users/fetchByIdStatus',
    async () => {
            const res = await fetch("http://localhost:8000/users");
            const data = await res.json();
      return data
    }
)

export const createNeWUsers = createAsyncThunk(
    'users/createNeWUsers',
    async (payload : IUserPayLoad, thunkAPI) => {
        const res = await fetch("http://localhost:8000/users",{
            method : 'POST',
            body : JSON.stringify({...payload}),
            headers : {
                "Content-Type" : "application/json"
            }
        },
    );
            
        const data = await res.json();
        if(data && data.id){
            thunkAPI.dispatch(fetchListUsers());
        }
        return data
    }
)

export const userSlide = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    resetCreateUser : (state) => {
        state.isCreateSuccess =false;
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListUsers.fulfilled, (state, action) => {

    state.listUsers = action.payload;

    }),
    builder.addCase(createNeWUsers.fulfilled, (state) => {
    state.isCreateSuccess = true;
    
    })
  },
})

export const {resetCreateUser} = userSlide.actions
export default userSlide.reducer