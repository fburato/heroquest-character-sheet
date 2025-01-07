'use client'

import "./style.css"

import { FC } from "react"

const NumericFieldWithBase: FC<{
    valueId: string,
    label: string,
}> = ({ valueId, label }) => {
    return (
        <div className="numericFieldWithBase numericField" id={valueId}>
            <span className="numericFieldLabel">{label}</span>
            <div>
                <button className="minus">-</button>
                <div className="inputs">
                    <input type="number" id={valueId + "Value"} name={valueId + "Value"} className="numericFieldInput" />
                    <input type="number" id={valueId + "Base"} name={valueId + "Base"} className="baseNumericFieldInput" />
                </div>
                <button className="plus">+</button>
            </div>
        </div>
    )
}

const NumericField: FC<{valueId: string, label: string}> = ({valueId, label}) => {
    return (
        <div className="numericField" id={valueId}>
            <span className="numericFieldLabel">{label}</span>
            <div>
            <div className="inputs">
                <input type="number" id={valueId + "Value"} name={valueId + "Value"} className="numericFieldInput"/>
            </div>
            </div>
        </div>
    )
}

const Quantity: FC<{quantity: number, id: number}> = ({quantity, id}) => {
    return (
        <div className="quantity" id={"qty-" + id}>
            <button className="minus" aria-label="Decrease">&minus;</button>
            <input type="number" className="input-box" value={quantity} />
            <button className="plus" aria-label="Increase">+</button>
        </div>
    )
}

enum ButtonPosition {
    First,
    Middle,
    Last,
}

const ActionButton: FC<{position: ButtonPosition}> = ({position}) => {
    return (
        <div className="actionButton">
            <div>
                <button className="up" aria-label="Move up" style={{visibility: (position == ButtonPosition.First ? "hidden" : "visible")}}>&#x2191;</button>
                <button className="delete" aria-label="Delete">&#x2573;</button>
                <button className="down" aria-label="Move down" style={{visibility: (position == ButtonPosition.Last ? "hidden" : "visible") }}>&#x2193;</button>
            </div>
        </div>
    )
}

//eslint-disable-next-line  @typescript-eslint/no-empty-object-type
const Inventory: FC<{}> = ({}) => {
    return (
    <div id="inventory">
        <ul id="inventoryList">
            <li><Quantity quantity={9} id={0} /><div className="item">Item 123 123 123 123 123 123 123 123 123</div><ActionButton position={ButtonPosition.First}/></li>
            <li><Quantity quantity={10} id={1} /><div className="item">Item 1</div><ActionButton position={ButtonPosition.Middle}/></li>
            <li><Quantity quantity={11} id={2} /><div className="item">Item 2</div><ActionButton position={ButtonPosition.Last}/></li>
        </ul>
        <div id="newItemForm">
            <label htmlFor="newItem">New Item:</label>
            <input type="text" id="newItem" name="newItem" />
            <button aria-label="Add item">Add</button>
        </div>
    </div>);
}

export default function CharacterSheet() {
    return (
        <div className="characterSheet">
            <section>
                <h1 id="header">Character sheet</h1>
            </section>
            <section id="general">
                    <label htmlFor="characterName">Name:</label>
                    <input type="text" id="characterName" name="characterName" />
                
                    <label htmlFor="characterType">Character:</label>
                    <input type="text" id="characterType" name="characterName" />
            </section>
            <hr />
            <section id="characterValues">
                <NumericFieldWithBase valueId="attackDice" label="Attack dice:" />
                <NumericFieldWithBase valueId="defendDice" label="Defend dice:" />
                <NumericFieldWithBase valueId="bodyPoints" label="Body points:" />
                <NumericFieldWithBase valueId="mindPoints" label="Mind points:" />
                <NumericField valueId="goldCoins" label="Gold coins:" />
                <NumericField valueId="quests" label="Quests:" />
            </section>
            <hr />
            <section id="inventory">
                <h1>Inventory</h1>
                <Inventory />
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