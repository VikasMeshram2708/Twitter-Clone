import { configureStore } from "@reduxjs/toolkit";
import { chatSlice } from "./chats/chatSlice";

export const store = configureStore({
  reducer: {
    [chatSlice.reducerPath]: chatSlice.reducer,
  },

  middleware: (getDeafultMiddleware) => {
    return getDeafultMiddleware().concat(chatSlice.middleware);
  },
});

export type RootType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
