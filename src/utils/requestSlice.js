import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "requests",
    initialState: {
        requests: [],
        selectedRequest: null,
    },
    selectedRequest: null,
    reducers: {
        addRequests: (state, actions) => {state.requests = actions.payload},
        setSelectedRequest: (state, actions) => {
            state.selectedRequest = actions.payload
        },
    } 
})

export const {addRequests, setSelectedRequest} = requestSlice.actions;
export default requestSlice.reducer;