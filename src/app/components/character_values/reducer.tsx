import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

export interface CharacterValues {
    attackDice: {
        value: number,
        baseValue: number,
    },
    defendDice: {
        value: number,
        baseValue: number,
    },
    bodyPoints: {
        value: number,
        baseValue: number,
    },
    mindPoints: {
        value: number,
        baseValue: number,
    },
    goldCoins: number,
    quests: number
}
const characterValuesSlice: Slice<CharacterValues> = createSlice({
    name: "characterValues",
    initialState: {
        attackDice: {
            value: 0,
            baseValue: 0,
        },
        defendDice: {
            value: 0,
            baseValue: 0,
        },
        bodyPoints: {
            value: 0,
            baseValue: 0,
        },
        mindPoints: {
            value: 0,
            baseValue: 0,
        },
        goldCoins: 0,
        quests: 0,
    },
    reducers: {
        // attack dice value
        changeAttackDiceValue: (state, action: PayloadAction<number>) => {
            if (action.payload >= 0) {
                state.attackDice.value = action.payload
            }
        },
        increaseAttackDiceValue: (state) => {
            state.attackDice.value += 1
        },
        decreaseAttackDiceValue: (state) => {
            if (state.attackDice.value > 0) {
                state.attackDice.value -= 1
            }
        },
        changeAttackDiceBaseValue: (state, action: PayloadAction<number>) => {
            if (action.payload >= 0) {
                state.attackDice.baseValue = action.payload
            }
        },
        // defend dice actions
        changeDefendDiceValue: (state, action: PayloadAction<number>) => {
            if (action.payload >= 0) {
                state.defendDice.value = action.payload
            }
        },
        increaseDefendDiceValue: (state) => {
            state.defendDice.value += 1
        },
        decreaseDefendDiceValue: (state) => {
            if (state.defendDice.value > 0) {
                state.defendDice.value -= 1
            }
        },
        changeDefendDiceBaseValue: (state, action: PayloadAction<number>) => {
            if (action.payload >= 0) {
                state.defendDice.baseValue = action.payload
            }
        },
        // body points values
        changeBodyPointsValue: (state, action: PayloadAction<number>) => {
            if (action.payload >= 0) {
                state.bodyPoints.value = action.payload
            }
        },
        increaseBodyPointsValue: (state) => {
            state.bodyPoints.value += 1
        },
        decreaseBodyPointsValue: (state) => {
            if (state.bodyPoints.value > 0) {
                state.bodyPoints.value -= 1
            }
        },
        changeBodyPointsBaseValue: (state, action: PayloadAction<number>) => {
            if (action.payload >= 0) {
                state.bodyPoints.baseValue = action.payload
            }
        },
        // mind points values
        changeMindPointsValue: (state, action: PayloadAction<number>) => {
            if (action.payload >= 0) {
                state.mindPoints.value = action.payload
            }
        },
        increaseMindPointsValue: (state) => {
            state.mindPoints.value += 1
        },
        decreaseMindPointsValue: (state) => {
            if (state.mindPoints.value > 0) {
                state.mindPoints.value -= 1
            }
        },
        changeMindPointsBaseValue: (state, action: PayloadAction<number>) => {
            if (action.payload >= 0) {
                state.mindPoints.baseValue = action.payload
            }
        },
        // gold coins values
        changeGoldCoinsValue: (state, action: PayloadAction<number>) => {
            if (action.payload >= 0) {
                state.goldCoins = action.payload
            }
        },
        // quests values
        changeQuestsValue: (state, action: PayloadAction<number>) => {
            if (action.payload >= 0) {
                state.quests = action.payload
            }
        },
    }
})

export const {
    changeAttackDiceValue, increaseAttackDiceValue, decreaseAttackDiceValue, changeAttackDiceBaseValue,
    changeDefendDiceValue, increaseDefendDiceValue, decreaseDefendDiceValue, changeDefendDiceBaseValue,
    changeBodyPointsValue, increaseBodyPointsValue, decreaseBodyPointsValue, changeBodyPointsBaseValue,
    changeMindPointsValue, increaseMindPointsValue, decreaseMindPointsValue, changeMindPointsBaseValue,
    changeGoldCoinsValue, changeQuestsValue
} = characterValuesSlice.actions
export const reducer = characterValuesSlice.reducer
