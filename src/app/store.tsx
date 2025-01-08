import { combineReducers, configureStore, createSlice, Reducer, Slice, UnknownAction } from "@reduxjs/toolkit";
import { reducer as generalReducer, actions as generalActions } from './components/general'
import { reducer as characterValuesReducer, actions as characterValuesActions } from './components/character_values'
import { reducer as inventoryReducer, actions as inventoryActions } from './components/inventory'
import { reducer as notesReducer, actions as notesActions } from './components/notes'
import { GeneralState } from "./components/general/reducer";
import { CharacterValues } from "./components/character_values/reducer";
import { InventoryState, Item } from "./components/inventory/reducer";
import { NotesState } from "./components/notes/reducer";
import { loadAction } from "./reducer";
export interface SummarisedState {
    name: string,
    character: string,
    characterValues: CharacterValues,
    items: Array<Item>,
    notes: string,
}

interface Store {
    general: GeneralState,
    characterValues: CharacterValues,
    summary?: SummarisedState,
    inventory: InventoryState
    notes: NotesState
}

const defaultCharacterValues = () => {
    return {
        attackDice: {
            value: 0,
            baseValue: 0,
        },
        defendDice: {
            value: 0,
            baseValue: 0,
        },
        bodyPoints: {
            value: 0,
            baseValue: 0,
        },
        mindPoints: {
            value: 0,
            baseValue: 0,
        },
        goldCoins: 0,
        quests: 0,
    }
}

const rootReducer: Reducer<Store> = combineReducers({
    general: generalReducer,
    characterValues: characterValuesReducer,
    inventory: inventoryReducer,
    notes: notesReducer,
    summary: (state: SummarisedState | undefined, action: UnknownAction): SummarisedState => {
        return {
            name: "",
            character: "",
            characterValues: defaultCharacterValues(),
            items: [],
            notes: ""
        }
    },
})

const summaryFromStore = (store: Store): SummarisedState => {
    return {
        name: store.general.name,
        character: store.general.character,
        characterValues: store.characterValues,
        items: store.inventory.items,
        notes: store.notes.text
    }
}

const summaryReducer: Reducer<Store> = (state: Store | undefined, action) => {
    if (loadAction.match(action)) {
        const actionState = action.payload
        const store: Store = {
            general: {
                name: actionState.name ? actionState.name : "",
                character: actionState.character ? actionState.character : "",
            },
            characterValues: actionState.characterValues ? actionState.characterValues : defaultCharacterValues(),
            inventory: {
                items: actionState.items ? actionState.items : [],
                newItemValue: ""
            },
            notes: {
                text: actionState.notes ? actionState.notes : ""
            },
            summary: actionState
        }
        return store
    }
    const calculatedState = rootReducer(state ? { ...state, summary: undefined } : undefined, action)
    const summary = summaryFromStore(calculatedState)
    const updated = {
        ...calculatedState,
        summary: summary
    }
    return updated
}

const store = configureStore<Store>({
    reducer: summaryReducer
})
export default store
