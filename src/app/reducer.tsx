import { createAction } from "@reduxjs/toolkit"
import { SummarisedState } from "./store"

const loadActionType = "LOAD_STATE"
export const loadAction = createAction<SummarisedState>(loadActionType)
