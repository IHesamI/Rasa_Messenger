import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Requests from '../API/Requests';

const initialState = {
  profileData: {},
  profileConfig: {
    lang: 'fa',
    theme: 'light',
    profileColor: '#123123',
  }
};
const registerUserProfile = createAsyncThunk('profile/sendRegisterData', async (body) => {
  try {
    const { data: profile } = await Requests().Register(body);

    return { profile };
  } catch (error) {
    console.log(error);
  }
});
const verifyemail = createAsyncThunk('profile/verifyemail', async (body) => {
  console.error(body);
  const data = await Requests().verifyEmail(body);
  return data.data;
});

const loginUserProfile = createAsyncThunk('profile/sendLoginData', async (body) => {
  try {
    const {
      data: { jwt, profile }
    } = await Requests().Login(body);
    return { jwt, profile};
  } catch (error) {
    console.log(error);
  }
});
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    changelang: (state, action) => {
      const { lang } = action.payload;
      state.lang = lang;
    },
    clearLogin: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('persist:profile');
      window.location.assign('/Login');
      console.log('hello');
    },
    UpdateImage: (state, action) => {
      if (!state.profileData.lastProfilePicture) {
        state.profileData.lastProfilePicture = {
          preLoadingContent: '',
          content: '',
          type: '',
          size: 0,
          name: '',
          lastModified: 0
        };
      }
      state.profileData.lastProfilePicture.preLoadingContent = action.payload;
    },
    UpdateProfile: (state, action) => {
      (state.profileData.profileName = action.payload.name),
        (state.profileData.handle = action.payload.handle),
        (state.profileData.biography = action.payload.biography);
    }
  },

  extraReducers: (builder) =>
    builder
      .addCase(registerUserProfile.fulfilled, (state, action) => {
        state.profileData = { ...action.payload.profile };
      })
      .addCase(verifyemail.fulfilled, (state, action) => {
        console.error(action.payload);
        state.jwt = action.payload.jwt;
        state.profileData = action.payload.profile;
        if (action.payload.jwt != '') {
          console.error('zarp', action.payload);
        } else {
          throw { error: 'wrong infos' };
        }
      })
      .addCase(loginUserProfile.fulfilled, (state, action) => {
        console.error(action.payload);
        const { jwt, profile } = action.payload;
        if (jwt) {
          state.profileData = { ...profile, jwt };
        } else {
          throw { error: 'didnt logged' };
        }
      })
});
export const { clearLogin, UpdateImage, UpdateProfile } = profileSlice.actions;
export { registerUserProfile, loginUserProfile, verifyemail };
export default profileSlice.reducer;
