import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseItemQuantity, decreaseItemQuantity, moveItemUp, moveItemDown, addNewItem, InventoryState, Item, deleteItem, newItemValueChange, changeItemQuantity } from "./reducer";
import { Dispatch } from "@reduxjs/toolkit";

const Quantity: FC<{ quantity: number, index: number, dispatch: Dispatch }> = ({ quantity, index, dispatch }) => {
    return (
        <>
            <button className="minus" aria-label="Decrease" onClick={() => dispatch(decreaseItemQuantity({ index: index }))}>&minus;</button>
            <input type="number" className="input-box" value={quantity} onChange={(event) => {
                const value = event.target.valueAsNumber
                if (value >= 0) {
                    dispatch(changeItemQuantity({ index: index, value: value }))
                }
            }} />
            <button className="plus" aria-label="Increase" onClick={() => dispatch(increaseItemQuantity({ index: index }))}>+</button>
        </>
    )
}

enum ButtonPosition {
    Only,
    First,
    Middle,
    Last,
}

const ActionButton: FC<{ index: number, position: ButtonPosition, dispatch: Dispatch }> = ({ index, position, dispatch }) => {
    return (
        <>
            <button className="up" aria-label="Move up" style={{ visibility: (position === ButtonPosition.First || position === ButtonPosition.Only ? "hidden" : "visible") }}
                onClick={() => {
                    if (position !== ButtonPosition.First) {
                        dispatch(moveItemUp({ index: index }))
                    }
                }}>&#x2191;</button>
            <button className="delete" aria-label="Delete" onClick={() => {
                dispatch(deleteItem({ index: index }))
            }}>&#x2573;</button>
            <button className="down" aria-label="Move down" style={{ visibility: (position == ButtonPosition.Last || position === ButtonPosition.Only ? "hidden" : "visible") }}
                onClick={() => {
                    if (position !== ButtonPosition.Last) {
                        dispatch(moveItemDown({ index: index }))
                    }
                }}>&#x2193;</button>
        </>
    )
}

const InventoryEntry: FC<{ index: number, item: Item, position: ButtonPosition, dispatch: Dispatch }> = ({ index, item, position, dispatch }) => {
    return (
        <>
            <Quantity index={index} quantity={item.qty} dispatch={dispatch} />
            <div className="item">{item.description}</div>
            <ActionButton index={index} position={position} dispatch={dispatch} />
        </>
    )
}


const Inventory: FC<{ inventoryItems: Array<Item>, dispatch: Dispatch }> = ({ inventoryItems, dispatch }) => {
    return (
        <div id="inventory">
            {inventoryItems.map((item, index) => {
                const position = index === 0 ? (inventoryItems.length === 1 ? ButtonPosition.Only : ButtonPosition.First) : (index === inventoryItems.length - 1 ? ButtonPosition.Last : ButtonPosition.Middle);
                return (<InventoryEntry index={index} item={item} dispatch={dispatch} position={position} key={"item-" + index} />)
            })}
        </div>);
}

const InventoryComponent: FC<unknown> = () => {
    const inventory = useSelector<{ inventory: InventoryState }, InventoryState>(state => state.inventory)
    const dispatch = useDispatch()
    return (
        <section id="inventorySection">
            <h1>Inventory</h1>
            <Inventory inventoryItems={inventory.items} dispatch={dispatch} />
            <div id="newItemForm">
                <label htmlFor="newItem">New Item:</label>
                <input type="text" id="newItem" name="newItem" value={inventory.newItemValue} onChange={(event) => dispatch(newItemValueChange(event.target.value))} />
                <button aria-label="Add item" onClick={() => {
                    if (inventory.newItemValue) {
                        dispatch(addNewItem(inventory.newItemValue))
                    }
                }}>Add</button>
            </div>
        </section>
    )
}

export default InventoryComponent
