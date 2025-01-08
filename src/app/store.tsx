import { configureStore, Reducer } from "@reduxjs/toolkit";
import { reducer as generalReducer, actions as generalActions } from './components/general'
import { reducer as characterValuesReducer, actions as characterValuesActions } from './components/character_values'
import { GeneralState } from "./components/general/reducer";
import { CharacterValues } from "./components/character_values/reducer";
interface SummarisedState {
    name: string,
    character: string,
}
interface Store {
    general: GeneralState,
    characterValues: CharacterValues,
    summary: SummarisedState
}
const summaryReducer: Reducer<SummarisedState> = (state: SummarisedState, action) => {
    if (typeof state === 'undefined') {
        return {
            name: "",
            character: ""
        }
    }
    if (generalActions.changeName.match(action)) {
        return {
            ...state,
            name: action.payload
        }
    }
    if (generalActions.changeCharacter.match(action)) {
        return {
            ...state,
            character: action.payload
        }
    }
    return state
}
const store = configureStore<Store>({
    reducer: {
        general: generalReducer,
        characterValues: characterValuesReducer,
        summary: summaryReducer
    }
})
export default store
