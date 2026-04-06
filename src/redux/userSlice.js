import { createSlice } from "@reduxjs/toolkit";

// Load
const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("userDetails");
    return data ? JSON.parse(data) : { user: "" };
  } catch {
    return { user: "" };
  }
};

// Save (ONLY user)
const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem("userDetails", JSON.stringify(state));
  } catch (e) {
    console.error(e);
  }
};

const initialState = {
  ...loadFromLocalStorage(),
  userInfo: null,
  isAuthChecked: false, // 🔥 important
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;

      // ✅ save only user
      saveToLocalStorage({
        user: state.user,
      });
    },

    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      state.isAuthChecked = true;
    },

    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },

    logout: (state) => {
      state.user = "";
      state.userInfo = null;
      state.isAuthChecked = true;
    },
  },
});

export const { setUser, setUserInfo, setAuthChecked, logout } =
  userSlice.actions;
export default userSlice.reducer;
