import { createAction } from "@reduxjs/toolkit"

const loadActionType = "LOAD_STATE"
export const loadAction = createAction<string>(loadActionType)
