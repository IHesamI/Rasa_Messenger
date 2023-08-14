import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Requests from '../API/Requests';
import { redirect, useLocation, useNavigate } from 'react-router-dom';
/**
 * 
    {
        "profile": {
            "profileID": 2,
            "profileName": "Sara",
            "type": "USER",
            "defaultProfileColor": "#e68873",
            "lastProfilePicture": null
        },
        "lastMessage": {
            "messageID": 2,
            "text": "سلام. خوبم ممنون تو چطوری ؟",
            "time": "2023-08-14T09:17:50.23945",
            "viewCount": 1
        },
        "unreadMessageCount": 1
    }
 * 
 * */ 

const initialState = {
  jwt: '',
  profileData: {}
};
const registerUserProfile = createAsyncThunk('profile/sendRegisterData', async (body) => {
  console.log(body);
  try {
    const data = await Requests().Register(body);
    console.log(data.data);
    return data.data;
  } catch (error) {}
});

const loginUserProfile = createAsyncThunk('profile/sendLoginData', async (body) => {
  console.log(body);
  try {
    const data = await Requests().Login(body);
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log(error);
  }
});
const profileSlice = createSlice({
  name: 'profile',
  initialState,

  extraReducers: (builder) =>
    builder
      .addCase(registerUserProfile.fulfilled, (state, action) => {
        if (action.payload != null) {
          state.jwt = action.payload.jwt;
          state.profileData = action.payload.profile;
        } else {
          throw { error: 'wrong infos' };
        }
      })
      .addCase(loginUserProfile.fulfilled, (state, action) => {
        if (action.payload.jwt) {
          state.jwt = action.payload.jwt;
          state.profileData = action.payload.profile;
        } else {
          throw { error: 'didnt logged' };
        }
      })
});
export { registerUserProfile, loginUserProfile };
export default profileSlice.reducer;
