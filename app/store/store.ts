import { configureStore } from "@reduxjs/toolkit";
import { chatSlice } from "./chats/chatSlice";
import { userSlice } from "./user/userSlice";

export const store = configureStore({
  reducer: {
    [chatSlice.reducerPath]: chatSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
  },

  middleware: (getDefaultMiddlware) => {
    return getDefaultMiddlware().concat(
      chatSlice.middleware,
      userSlice.middleware
    );
  },
});
