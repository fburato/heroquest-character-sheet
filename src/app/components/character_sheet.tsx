'use client'

import { useDispatch, useSelector } from "react-redux"
import "./style.css"

import { FC } from "react"
import GeneralInfo from "./general"
import CharacterValues from "./character_values"

const NumericFieldWithBase: FC<{
    valueId: string,
    label: string,
}> = ({ valueId, label }) => {
    return (
        <>
            <div className="numericFieldLabel" id={valueId + "Label"}>
                <span>{label}</span>
            </div>
            <button className="minus">-</button>
            <div className="fields">
                <input type="number" id={valueId + "Value"} name={valueId + "Value"} className="numericFieldInput" />
                <input type="number" id={valueId + "Base"} name={valueId + "Base"} className="baseNumericFieldInput" />
            </div>
            <button className="plus">+</button>
        </>
    )
}

const NumericField: FC<{ valueId: string, label: string }> = ({ valueId, label }) => {
    return (
        <>
            <div className="numericFieldLabel" id={valueId + "Label"}>
                <span>{label}</span>
            </div>
            <div>
                <div className="inputs">
                    <input type="number" id={valueId + "Value"} name={valueId + "Value"} className="numericFieldInput" />
                </div>
            </div>
        </>
    )
}

const Quantity: FC<{ quantity: number }> = ({ quantity }) => {
    return (
        <>
            <button className="minus" aria-label="Decrease">&minus;</button>
            <input type="number" className="input-box" value={quantity} />
            <button className="plus" aria-label="Increase">+</button>
        </>
    )
}

enum ButtonPosition {
    First,
    Middle,
    Last,
}

const ActionButton: FC<{ position: ButtonPosition }> = ({ position }) => {
    return (
        <>
            <button className="up" aria-label="Move up" style={{ visibility: (position == ButtonPosition.First ? "hidden" : "visible") }}>&#x2191;</button>
            <button className="delete" aria-label="Delete">&#x2573;</button>
            <button className="down" aria-label="Move down" style={{ visibility: (position == ButtonPosition.Last ? "hidden" : "visible") }}>&#x2193;</button>
        </>
    )
}

//eslint-disable-next-line  @typescript-eslint/no-empty-object-type
const Inventory: FC<{}> = ({ }) => {
    return (
        <div id="inventory">
            <Quantity quantity={9} />
            <div className="item">Item 123 123 123 123 123 123 123 123 123</div>
            <ActionButton position={ButtonPosition.First} />
            <Quantity quantity={10} />
            <div className="item">Item 1</div>
            <ActionButton position={ButtonPosition.Middle} />
            <Quantity quantity={11} />
            <div className="item">Item 2</div>
            <ActionButton position={ButtonPosition.Last} />
        </div>);
}

export default function CharacterSheet() {
    return (
        <div className="characterSheet">
            <section>
                <h1 id="header">Character sheet</h1>
            </section>
            <GeneralInfo />
            <hr />
            <CharacterValues />
            <hr />
            <section id="inventorySection">
                <h1>Inventory</h1>
                <Inventory />
                <div id="newItemForm">
                    <label htmlFor="newItem">New Item:</label>
                    <input type="text" id="newItem" name="newItem" />
                    <button aria-label="Add item">Add</button>
                </div>
            </section>
            <hr />
            <section id="notes">
                <h1>Notes</h1>
                <textarea></textarea>
            </section>
            <hr />
        </div>
    )
}