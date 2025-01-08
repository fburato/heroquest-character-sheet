import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

export interface GeneralState {
    name: string,
    character: string,
}
const generalSlice: Slice<GeneralState> = createSlice({
    name: "general",
    initialState: {
        name: "",
        character: ""
    },
    reducers: {
        changeName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        },
        changeCharacter: (state, action: PayloadAction<string>) => {
            state.character = action.payload
        }
    }
})

export const { changeName, changeCharacter } = generalSlice.actions
export const reducer = generalSlice.reducer
