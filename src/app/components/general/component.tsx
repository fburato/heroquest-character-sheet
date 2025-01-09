import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCharacter, changeName, GeneralState } from "./reducer";
import { getLocalisedMessages } from "../lang";

const GeneralInfo: FC<unknown> = () => {
    const messages = getLocalisedMessages()
    const characterName = useSelector<{ general: GeneralState }, string>(state => state.general.name)
    const characterKind = useSelector<{ general: GeneralState }, string>(state => state.general.character)
    const dispatch = useDispatch()
    return (
        <section id="general">
            <label htmlFor="characterName">{messages["general.name.label"]}</label>
            <input type="text" id="characterName" name="characterName" value={characterName} onChange={(event) => dispatch(changeName(event.target.value))} />
            <label htmlFor="characterType">{messages["general.character.label"]}</label>
            <input type="text" id="characterType" name="characterName" value={characterKind} onChange={(event) => dispatch(changeCharacter(event.target.value))} />
        </section>
    )
}
export default GeneralInfo
