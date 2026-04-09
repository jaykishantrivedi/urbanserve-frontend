import { createSlice } from "@reduxjs/toolkit"

const citySlice = createSlice({
    name: "city",
    initialState: {
        selectedCity: "Mumbai"
    },
    reducers: {
        setCity: (state, action) => {
            state.selectedCity = action.payload
        }
    }
})

export const { setCity } = citySlice.actions
export default citySlice.reducer