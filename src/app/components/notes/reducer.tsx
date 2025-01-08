import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

export interface NotesState {
    text: string,
}
const notesSlice: Slice<NotesState> = createSlice({
    name: "notes",
    initialState: {
        text: ""
    },
    reducers: {
        updateNotes: (state, action: PayloadAction<string>) => {
            state.text = action.payload
        },
    }
})

export const { updateNotes } = notesSlice.actions
export const reducer = notesSlice.reducer
