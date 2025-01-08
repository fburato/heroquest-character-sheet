import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

export interface Item {
    qty: number,
    description: string
}
export interface InventoryState {
    items: Array<Item>,
    newItemValue: string,
}

export interface IndexedPayload {
    index: number
}

export interface IndexedPayloadWithValue {
    index: number,
    value: number,
}
const defaultInvetory = (): InventoryState => {
    return {
        items: [],
        newItemValue: ""
    }
}
const inventorySlice: Slice<InventoryState> = createSlice({
    name: "inventory",
    initialState: defaultInvetory(),
    reducers: {
        increaseItemQuantity: (state: InventoryState, action: PayloadAction<IndexedPayload>) => {
            const index = action.payload.index
            if (0 <= index && index < state.items.length) {
                state.items[index].qty += 1
            }

        },
        decreaseItemQuantity: (state: InventoryState, action: PayloadAction<IndexedPayload>) => {
            const index = action.payload.index
            if (0 <= index && index < state.items.length && state.items[index].qty > 0) {
                state.items[index].qty -= 1
            }
        },
        changeItemQuantity: (state: InventoryState, action: PayloadAction<IndexedPayloadWithValue>) => {
            const index = action.payload.index
            const value = action.payload.value
            if (0 <= index && index < state.items.length && value >= 0) {
                state.items[index].qty = value
            }
        },
        moveItemUp: (state: InventoryState, action: PayloadAction<IndexedPayload>) => {
            const index = action.payload.index
            const items = state.items.map(i => i)
            if (0 < index && index < state.items.length) {
                const temporary = items[index]
                items[index] = items[index - 1]
                items[index - 1] = temporary
            }
            state.items = items
        },
        deleteItem: (state: InventoryState, action: PayloadAction<IndexedPayload>) => {
            const index = action.payload.index
            if (0 <= index && index < state.items.length) {
                state.items.splice(index, 1)
            }
        },
        moveItemDown: (state: InventoryState, action: PayloadAction<IndexedPayload>) => {
            const index = action.payload.index
            if (0 <= index && index < state.items.length - 1) {
                const temporary = state.items[index]
                state.items[index] = state.items[index + 1]
                state.items[index + 1] = temporary
            }
        },
        newItemValueChange: (state: InventoryState, action: PayloadAction<string>) => {
            state.newItemValue = action.payload
        },
        addNewItem: (state: InventoryState, action: PayloadAction<string>) => {
            state.items.push({ qty: 1, description: action.payload })
        }
    }
})

export const { increaseItemQuantity, decreaseItemQuantity, moveItemUp, deleteItem, moveItemDown, newItemValueChange, addNewItem, changeItemQuantity } = inventorySlice.actions
export const reducer = inventorySlice.reducer
