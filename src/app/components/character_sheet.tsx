'use client'

import "./style.css"

import GeneralInfo from "./general"
import CharacterValues from "./character_values"
import InventoryComponent from "./inventory"
import NotesSection from "./notes"
import { getLocalisedMessages } from "./lang"

export default function CharacterSheet() {
    const messages = getLocalisedMessages()
    return (
        <div className="characterSheet">
            <section>
                <h1 id="header">{messages["app.header"]}</h1>
            </section>
            <GeneralInfo />
            <hr />
            <CharacterValues />
            <hr />
            <InventoryComponent />
            <hr />
            <NotesSection />
            <hr />
        </div>
    )
}