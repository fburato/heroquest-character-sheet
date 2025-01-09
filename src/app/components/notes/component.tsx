import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotesState, updateNotes } from "./reducer";
import { getLocalisedMessages } from "../lang";

const NotesSection: FC<unknown> = () => {
    const messages = getLocalisedMessages()
    const text = useSelector<{ notes: NotesState }, string>(state => state.notes.text)
    const dispatch = useDispatch()
    return (
        <section id="notes">
            <h1>{messages["notes.header"]}</h1>
            <textarea value={text} onChange={(event) => dispatch(updateNotes(event.target.value))} />
        </section>
    )
}
export default NotesSection
