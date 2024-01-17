import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BaseState } from "../../helper/interface";

const initialState: BaseState = {
  token: null,
  loading: false,
  isSuperUser: false,
};

const baseSlice = createSlice({
  name: "base",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    setIsSuperUser(state, action: PayloadAction<boolean>) {
      state.isSuperUser = action.payload;
    },
  },
});

export const { setToken, setIsSuperUser } = baseSlice.actions;

export default baseSlice.reducer;
