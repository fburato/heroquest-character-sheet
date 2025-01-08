'use client'

import "./style.css"

import GeneralInfo from "./general"
import CharacterValues from "./character_values"
import InventoryComponent from "./inventory"
import NotesSection from "./notes"

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
            <InventoryComponent />
            <hr />
            <NotesSection />
            <hr />
        </div>
    )
}