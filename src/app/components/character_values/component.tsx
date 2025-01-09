import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { changeAttackDiceBaseValue, changeAttackDiceValue, changeBodyPointsBaseValue, changeBodyPointsValue, changeDefendDiceBaseValue, changeDefendDiceValue, changeGoldCoinsValue, changeMindPointsBaseValue, changeMindPointsValue, changeQuestsValue, CharacterValues, decreaseAttackDiceValue, decreaseBodyPointsValue, decreaseDefendDiceValue, decreaseMindPointsValue, increaseAttackDiceValue, increaseBodyPointsValue, increaseDefendDiceValue, increaseMindPointsValue } from "./reducer"


const NumericFieldWithBase: FC<{
    value: number,
    baseValue: number,
    valueId: string,
    label: string,
    onChangeHandler: (value: number) => void,
    plusHandler: () => void,
    minusHandler: () => void,
    onBaseChangeHandler: (value: number) => void
}> = ({ value, baseValue, valueId, label, onChangeHandler, plusHandler, minusHandler, onBaseChangeHandler }) => {
    return (
        <>
            <div className="numericFieldLabel" id={valueId + "Label"}>
                <span>{label}</span>
            </div>
            <button className="minus" onClick={minusHandler}>-</button>
            <div className="fields">
                <input type="number" min={0} id={valueId + "Value"} name={valueId + "Value"} className="numericFieldInput" value={value} onChange={(event) => {
                    onChangeHandler(event.target.valueAsNumber)
                }} onFocus={(event) => event.target.select()} />
                <input type="number" min={0} id={valueId + "Base"} name={valueId + "Base"} className="baseNumericFieldInput" value={baseValue} onChange={(event) => {
                    onBaseChangeHandler(event.target.valueAsNumber)
                }} onFocus={(event) => event.target.select()} />
            </div>
            <button className="plus" onClick={plusHandler}>+</button>
        </>
    )
}

const NumericField: FC<{ valueId: string, label: string, value: number, onChangeHandler: (value: number) => void, }> = ({ valueId, label, onChangeHandler, value }) => {
    return (
        <>
            <div className="numericFieldLabel" id={valueId + "Label"}>
                <span>{label}</span>
            </div>
            <div>
                <div className="inputs">
                    <input value={value} min={0} type="number" id={valueId + "Value"} name={valueId + "Value"} className="numericFieldInput" onChange={(event) => {
                        onChangeHandler(event.target.valueAsNumber)
                    }} onFocus={(event) => event.target.select()} />
                </div>
            </div>
        </>
    )
}

const CharacterValuesComponent: FC<unknown> = () => {
    const characterValues = useSelector<{ characterValues: CharacterValues }, CharacterValues>(state => state.characterValues)
    const dispatch = useDispatch()
    return (
        <section id="characterValues">
            <div id="characterValuesBase">
                <NumericFieldWithBase
                    value={characterValues.attackDice.value}
                    baseValue={characterValues.attackDice.baseValue}
                    valueId="attackDice"
                    label="Attack dice:"
                    onChangeHandler={(num) => dispatch(changeAttackDiceValue(num))}
                    plusHandler={() => dispatch(increaseAttackDiceValue(null))}
                    minusHandler={() => dispatch(decreaseAttackDiceValue(null))}
                    onBaseChangeHandler={(num) => dispatch(changeAttackDiceBaseValue(num))}
                />
                <NumericFieldWithBase
                    value={characterValues.defendDice.value}
                    baseValue={characterValues.defendDice.baseValue}
                    valueId="defendDice"
                    label="Defend dice:"
                    onChangeHandler={(num) => dispatch(changeDefendDiceValue(num))}
                    plusHandler={() => dispatch(increaseDefendDiceValue(null))}
                    minusHandler={() => dispatch(decreaseDefendDiceValue(null))}
                    onBaseChangeHandler={(num) => dispatch(changeDefendDiceBaseValue(num))}
                />
                <NumericFieldWithBase
                    value={characterValues.bodyPoints.value}
                    baseValue={characterValues.bodyPoints.baseValue}
                    valueId="bodyPoints"
                    label="Body points:"
                    onChangeHandler={(num) => dispatch(changeBodyPointsValue(num))}
                    plusHandler={() => dispatch(increaseBodyPointsValue(null))}
                    minusHandler={() => dispatch(decreaseBodyPointsValue(null))}
                    onBaseChangeHandler={(num) => dispatch(changeBodyPointsBaseValue(num))}
                />
                <NumericFieldWithBase
                    value={characterValues.mindPoints.value}
                    baseValue={characterValues.mindPoints.baseValue}
                    valueId="mindPoints"
                    label="Mind points:"
                    onChangeHandler={(num) => dispatch(changeMindPointsValue(num))}
                    plusHandler={() => dispatch(increaseMindPointsValue(null))}
                    minusHandler={() => dispatch(decreaseMindPointsValue(null))}
                    onBaseChangeHandler={(num) => dispatch(changeMindPointsBaseValue(num))}
                />
            </div>
            <div id="characterValuesFree">
                <NumericField value={characterValues.goldCoins} valueId="goldCoins" label="Gold coins:" onChangeHandler={(num) => dispatch(changeGoldCoinsValue(num))} />
                <NumericField value={characterValues.quests} valueId="quests" label="Quests:" onChangeHandler={(num) => dispatch(changeQuestsValue(num))} />
            </div>
        </section>
    )
}

export default CharacterValuesComponent