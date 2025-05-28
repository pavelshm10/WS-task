import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ConnectionStatus } from "../../types/connection";

interface ConnectionState {
  status: ConnectionStatus;
  isWebSocketActive: boolean;
}

const initialState: ConnectionState = {
  status: ConnectionStatus.DISCONNECTED,
  isWebSocketActive: false,
};

const connectionSlice = createSlice({
  name: "connection",
  initialState,
  reducers: {
    setConnectionStatus(state, action: PayloadAction<ConnectionStatus>) {
      state.status = action.payload;
    },
    setWebSocketActive(state, action: PayloadAction<boolean>) {
      state.isWebSocketActive = action.payload;
    },
  },
});

export const { setConnectionStatus, setWebSocketActive } =
  connectionSlice.actions;
export default connectionSlice.reducer;
