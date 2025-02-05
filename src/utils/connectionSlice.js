import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState:{
    connections: [],
    selectedConnection: null,
  },
  reducers: {
    addConnections: (state, action) => {state.connections = action.payload},
    removeConnections: (state) => {state.connections = []},
    setSelectedConnection: (state, action) => {state.selectedConnection = action.payload},
  },
});

export const { addConnections, removeConnections, setSelectedConnection } = connectionSlice.actions;
export default connectionSlice.reducer;
