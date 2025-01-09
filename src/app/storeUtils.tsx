export const savedState: string = "savedState"

export const getSavedState = (): string => {
    if (typeof document !== "undefined" && typeof document.location !== "undefined" && typeof document.location.search !== "undefined") {
        const searchParams = new URLSearchParams(document.location.search)
        const localeParam = searchParams.get("sheet")
        if (localeParam) {
            return localeParam
        } else {
            return savedState
        }
    } else {
        return savedState
    }
}