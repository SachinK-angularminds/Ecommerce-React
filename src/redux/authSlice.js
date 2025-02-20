import { createSlice } from '@reduxjs/toolkit'

const initialState={
    authData:{}
}
 const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setAuthData:(state,action)=>{
        state.authData=action.payload
    }
  }
})

export const { setAuthData } = authSlice.actions
export default authSlice.reducer; 