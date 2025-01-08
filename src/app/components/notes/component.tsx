import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotesState, updateNotes } from "./reducer";

const NotesSection: FC<{}> = ({ }) => {
    const text = useSelector<{ notes: NotesState }, string>(state => state.notes.text)
    const dispatch = useDispatch()
    return (
        <section id="notes">
            <h1>Notes</h1>
            <textarea value={text} onChange={(event) => dispatch(updateNotes(event.target.value))} />
        </section>
    )
}
export default NotesSection
