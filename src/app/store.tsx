import { combineReducers, configureStore, createSlice, Reducer, Slice } from "@reduxjs/toolkit";
import { reducer as generalReducer } from './components/general'
import { reducer as characterValuesReducer } from './components/character_values'
import { reducer as inventoryReducer } from './components/inventory'
import { reducer as notesReducer } from './components/notes'
import { GeneralState } from "./components/general/reducer";
import { CharacterValues } from "./components/character_values/reducer";
import { InventoryState, Item } from "./components/inventory/reducer";
import { NotesState } from "./components/notes/reducer";
import { loadAction } from "./reducer";
import { getSavedState } from "./storeUtils";
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
    summary: SummarisedState,
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

const defaultSummary = (): SummarisedState => {
    return {
        name: "",
        character: "",
        characterValues: defaultCharacterValues(),
        items: [],
        notes: ""
    }
}

const dummySummaryReducer: Slice<SummarisedState> = createSlice({
    name: "summary",
    initialState: defaultSummary(),
    reducers: {}
})

const rootReducer: Reducer<Store> = combineReducers({
    general: generalReducer,
    characterValues: characterValuesReducer,
    inventory: inventoryReducer,
    notes: notesReducer,
    summary: dummySummaryReducer.reducer,
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

const storeFromSummary = (summary: SummarisedState): Store => {
    return {
        general: {
            name: summary.name,
            character: summary.character
        },
        characterValues: summary.characterValues,
        inventory: {
            items: summary.items,
            newItemValue: ""
        },
        notes: {
            text: summary.notes
        },
        summary: summary
    }
}

const parseSummary = (value: string): SummarisedState => {
    //eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const isItem = (value: any): boolean => {
        if (value.qty && value.description && typeof value.qty === "number" && typeof value.description === "string") {
            return true
        } else {
            return false
        }
    }
    try {
        const parsedState = JSON.parse(value)
        return {
            name: parsedState.name ? parsedState.name : "",
            character: parsedState.character ? parsedState.character : "",
            characterValues: parsedState.characterValues ? {
                attackDice: {
                    value: parsedState.characterValues?.attackDice?.value ? parsedState.characterValues.attackDice.value : 0,
                    baseValue: parsedState.characterValues?.attackDice?.baseValue ? parsedState.characterValues.attackDice.baseValue : 0,
                },
                defendDice: {
                    value: parsedState.characterValues?.defendDice?.value ? parsedState.characterValues.defendDice.value : 0,
                    baseValue: parsedState.characterValues?.defendDice?.baseValue ? parsedState.characterValues.defendDice.baseValue : 0,
                },
                bodyPoints: {
                    value: parsedState.characterValues?.bodyPoints?.value ? parsedState.characterValues.bodyPoints.value : 0,
                    baseValue: parsedState.characterValues?.bodyPoints?.baseValue ? parsedState.characterValues.bodyPoints.baseValue : 0,
                },
                mindPoints: {
                    value: parsedState.characterValues?.mindPoints?.value ? parsedState.characterValues.mindPoints.value : 0,
                    baseValue: parsedState.characterValues?.mindPoints?.baseValue ? parsedState.characterValues.mindPoints.baseValue : 0,
                },
                goldCoins: parsedState.characterValues?.goldCoins ? parsedState.characterValues.goldCoins : 0,
                quests: parsedState.characterValues?.quests ? parsedState.characterValues.quests : 0,
            } : defaultCharacterValues(),
            //eslint-disable-next-line  @typescript-eslint/no-explicit-any
            items: parsedState.items && parsedState.items.constructor === Array<any> ? (parsedState.items as Array<any>).filter(isItem).map(i => { return { qty: i.qty, description: i.description } }) : [],
            notes: parsedState.notes ? parsedState.notes : ""
        }
    } catch (e) {
        console.error(e)
        return defaultSummary()
    }
}

const summaryReducer: Reducer<Store> = (state: Store | undefined, action) => {
    if (loadAction.match(action)) {

        const actionState = parseSummary(action.payload)
        if (typeof window !== "undefined") {
            window.localStorage.setItem(getSavedState(), JSON.stringify(actionState))
        }
        const store: Store = {
            general: {
                name: actionState.name,
                character: actionState.character,
            },
            characterValues: actionState.characterValues,
            inventory: {
                items: actionState.items,
                newItemValue: ""
            },
            notes: {
                text: actionState.notes
            },
            summary: actionState
        }
        return store
    }
    const calculatedState = rootReducer(state ? { ...state, summary: defaultSummary() } : undefined, action)
    const summary = summaryFromStore(calculatedState)
    if (typeof window !== "undefined") {
        window.localStorage.setItem(getSavedState(), JSON.stringify(summary))
    }
    const updated = {
        ...calculatedState,
        summary: summary
    }
    return updated
}

const storeFromLocalStorage = (): SummarisedState => {
    if (typeof window === "undefined") {
        return defaultSummary()
    }
    const state: string | null = window.localStorage.getItem(getSavedState())
    //eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const isItem = (value: any): boolean => {
        if (value.qty && value.description && typeof value.qty === "number" && typeof value.description === "string") {
            return true
        } else {
            return false
        }
    }
    if (state) {
        try {
            const parsedState = JSON.parse(state)
            return {
                name: parsedState.name ? parsedState.name : "",
                character: parsedState.character ? parsedState.character : "",
                characterValues: parsedState.characterValues ? {
                    attackDice: {
                        value: parsedState.characterValues?.attackDice?.value ? parsedState.characterValues.attackDice.value : 0,
                        baseValue: parsedState.characterValues?.attackDice?.baseValue ? parsedState.characterValues.attackDice.baseValue : 0,
                    },
                    defendDice: {
                        value: parsedState.characterValues?.defendDice?.value ? parsedState.characterValues.defendDice.value : 0,
                        baseValue: parsedState.characterValues?.defendDice?.baseValue ? parsedState.characterValues.defendDice.baseValue : 0,
                    },
                    bodyPoints: {
                        value: parsedState.characterValues?.bodyPoints?.value ? parsedState.characterValues.bodyPoints.value : 0,
                        baseValue: parsedState.characterValues?.bodyPoints?.baseValue ? parsedState.characterValues.bodyPoints.baseValue : 0,
                    },
                    mindPoints: {
                        value: parsedState.characterValues?.mindPoints?.value ? parsedState.characterValues.mindPoints.value : 0,
                        baseValue: parsedState.characterValues?.mindPoints?.baseValue ? parsedState.characterValues.mindPoints.baseValue : 0,
                    },
                    goldCoins: parsedState.characterValues?.goldCoins ? parsedState.characterValues.goldCoins : 0,
                    quests: parsedState.characterValues?.quests ? parsedState.characterValues.quests : 0,
                } : defaultCharacterValues(),
                //eslint-disable-next-line  @typescript-eslint/no-explicit-any
                items: parsedState.items && parsedState.items.constructor === Array<any> ? (parsedState.items as Array<any>).filter(isItem).map(i => { return { qty: i.qty, description: i.description } }) : [],
                notes: parsedState.notes ? parsedState.notes : ""
            }
        } catch (e) {
            console.error(e)
            return defaultSummary()
        }
    } else {
        return defaultSummary()
    }
}

const store = configureStore<Store>({
    reducer: summaryReducer,
    preloadedState: storeFromSummary(storeFromLocalStorage())
})
export default store
