import CharacterValues from './component'
import {
    reducer, changeAttackDiceValue, increaseAttackDiceValue, decreaseAttackDiceValue, changeAttackDiceBaseValue,
    changeDefendDiceValue, increaseDefendDiceValue, decreaseDefendDiceValue, changeDefendDiceBaseValue,
    changeBodyPointsValue, increaseBodyPointsValue, decreaseBodyPointsValue, changeBodyPointsBaseValue,
    changeMindPointsValue, increaseMindPointsValue, decreaseMindPointsValue, changeMindPointsBaseValue,
    changeGoldCoinsValue, changeQuestsValue
} from './reducer'
const actions = {
    changeAttackDiceValue, increaseAttackDiceValue, decreaseAttackDiceValue, changeAttackDiceBaseValue,
    changeDefendDiceValue, increaseDefendDiceValue, decreaseDefendDiceValue, changeDefendDiceBaseValue,
    changeBodyPointsValue, increaseBodyPointsValue, decreaseBodyPointsValue, changeBodyPointsBaseValue,
    changeMindPointsValue, increaseMindPointsValue, decreaseMindPointsValue, changeMindPointsBaseValue,
    changeGoldCoinsValue, changeQuestsValue
}
export { reducer, actions }
export default CharacterValues
