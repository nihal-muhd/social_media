import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const userLogin = createAsyncThunk('user/userLogin', async (formData) => {
  const res = await axios.post('http://localhost:5000/login', formData, { withCredentials: true })
  res.data.loggedIn = true
  return res
})

export const getUserData = createAsyncThunk('user/userData', async () => {
  const res = await axios.get('http://localhost:5000/getUserData', { withCredentials: true })
  res.data.loggedIn = true
  console.log(res.data)
  return res
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    rejected: false,
    fulfilled: false
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload
    },
    logout: (state, action) => {
      state.user = null
    }
  },
  extraReducers: {
    [userLogin.pending]: (state, action) => {
      console.log('loading')
      state.loading = true
    },
    [userLogin.fulfilled]: (state, action) => {
      console.log(action.payload.data)
      state.user = action.payload.data
      state.fulfilled = true
      state.loading = false
    },
    [userLogin.rejected]: (state, action) => {
      console.log('rejected')
      state.rejected = true
      state.loading = false
    },
    [getUserData.pending]: (state, action) => {
      console.log('loading')
      state.loading = true
    },
    [getUserData.fulfilled]: (state, action) => {
      console.log(action.payload.data)
      state.user = action.payload.data
      state.fulfilled = true
      state.loading = false
    },
    [getUserData.rejected]: (state, action) => {
      console.log('rejected')
      state.rejected = true
      state.loading = false
    }
  }

})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
