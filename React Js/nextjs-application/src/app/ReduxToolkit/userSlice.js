import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

var checkLogin = Cookies.get('user_login');

const initialState = {
  isLogin: checkLogin ?? 0,
}

export const userSlice = createSlice({
  name: 'user_login',
  initialState,
  reducers: {
    login: (firstLogin) => {
      firstLogin.isLogin = 1;
      Cookies.set('user_login', 1);
    },
    register: () => {
    },
    logout: (firstLogout) => {
      firstLogout.isLogin = 0;
      Cookies.remove('user_login')
    },  
  },
})

// Action creators are generated for each case reducer function
export const { login, register, logout } = userSlice.actions

export default userSlice.reducer