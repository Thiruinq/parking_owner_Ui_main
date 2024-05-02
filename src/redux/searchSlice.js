import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: {
        from: "",
        to: "",
        selectedFromTime: "",
        selectedToTime: "",
        event: "",
        destination: "",
        vehicle_type: "",
        error: {}
    },
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        updateSearchInput: (state, action) => {
            console.log("update search", action.payload)
            const { name, value } = action.payload;
            state.value[name] = value;
        },
        searchSubmit: (state, action) => {
            //   console.log("redux payload", action.payload)
            const { data } = action.payload;

            return {
                ...state,
                value: {
                    ...data,
                }
            }
        },

    },
})

// Action creators are generated for each case reducer function
export const { searchSubmit, updateSearchInput } = searchSlice.actions

export default searchSlice.reducer