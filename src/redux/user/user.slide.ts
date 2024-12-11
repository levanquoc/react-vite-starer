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
    isCreateSuccess :boolean,
    isUpdateSuccess :boolean,
    isDeleteSuccess : boolean
} = {
  listUsers: [],
  isCreateSuccess : false,
  isUpdateSuccess : false,
  isDeleteSuccess : false
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

export const updateUsers = createAsyncThunk(
    'users/updateUser',
    async (payload : any, thunkAPI) => {
        const res = await fetch(`http://localhost:8000/users/${payload.id}`,{
            method : 'PUT',
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

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (payload : any, thunkAPI) => {
        const res = await fetch(`http://localhost:8000/users/${payload.id}`,{
            method : 'DELETE',
            body : JSON.stringify({...payload}),
            headers : {
                "Content-Type" : "application/json"
            }
        },
    );
            
        const data = await res.json();
        thunkAPI.dispatch(fetchListUsers());
        return data
    }
)

export const userSlide = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    resetCreateUser : (state) => {
        state.isCreateSuccess =false;
    },
    resetUpdateUser : (state) => {
        state.isUpdateSuccess =false;
    },
    resetDeleteUser : (state) => {
        state.isDeleteSuccess =false;
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListUsers.fulfilled, (state, action) => {

    state.listUsers = action.payload;

    }),
    builder.addCase(createNeWUsers.fulfilled, (state) => {
    state.isCreateSuccess = true;
    
    }),
    builder.addCase(updateUsers.fulfilled, (state) => {
        state.isUpdateSuccess = true;
    }),
    builder.addCase(deleteUser.fulfilled, (state) => {
        state.isDeleteSuccess = true;  
    })
  },
})

export const {resetCreateUser,resetUpdateUser,resetDeleteUser} = userSlide.actions
export default userSlide.reducer