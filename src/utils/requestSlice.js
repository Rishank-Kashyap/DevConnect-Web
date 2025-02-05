import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "requests",
    initialState: {
        requests: [],
        selectedRequest: null,
    },
    reducers: {
        addRequests: (state, actions) => {state.requests = actions.payload},
        removeRequest: (state, actions) => {
            state.requests = state.requests.filter((request) => request._id !== actions.payload);
        },
        setSelectedRequest: (state, actions) => {
            state.selectedRequest = actions.payload
        },
    } 
})

export const {addRequests, removeRequest, setSelectedRequest} = requestSlice.actions;
export default requestSlice.reducer;