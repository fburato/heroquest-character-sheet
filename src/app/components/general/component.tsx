import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCharacter, changeName, GeneralState } from "./reducer";

const GeneralInfo: FC<unknown> = () => {
    const characterName = useSelector<{ general: GeneralState }, string>(state => state.general.name)
    const characterKind = useSelector<{ general: GeneralState }, string>(state => state.general.character)
    const dispatch = useDispatch()
    return (
        <section id="general">
            <label htmlFor="characterName">Name:</label>
            <input type="text" id="characterName" name="characterName" value={characterName} onChange={(event) => dispatch(changeName(event.target.value))} />
            <label htmlFor="characterType">Character:</label>
            <input type="text" id="characterType" name="characterName" value={characterKind} onChange={(event) => dispatch(changeCharacter(event.target.value))} />
        </section>
    )
}
export default GeneralInfo
