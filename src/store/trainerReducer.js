import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    trainers: []
}

export const trainerReducer = createSlice({
    name: "trainer",
    initialState,
    reducers:{
        updateTrainers: (state, action) => {
            state.trainers = action.payload
        }
    }
})

export const  { updateTrainers } = trainerReducer.actions
export default trainerReducer.reducer;