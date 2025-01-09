interface Messages {
    "app.header": string
    "general.name.label": string,
    "general.character.label": string
    "characterValues.attackDice.label": string
    "characterValues.defendDice.label": string
    "characterValues.bodyPoints.label": string
    "characterValues.mindPoints.label": string
    "characterValues.goldCoins.label": string
    "characterValues.quests.label": string
    "inventory.header": string
    "inventory.newItem.label": string
    "inventory.newItemButton.label": string
    "notes.header": string
    "app.downloadButton.label": string
    "app.uploadButton.label": string
}

interface Translations {
    it: Messages
    en: Messages
}

const translations: Translations = {
    it: {
        "app.header": "Scheda personaggio",
        "general.name.label": "Nome:",
        "general.character.label": "Personaggio:",
        "characterValues.attackDice.label": "Dadi d'attacco:",
        "characterValues.defendDice.label": "Dadi di difesa",
        "characterValues.bodyPoints.label": "Punti corpo:",
        "characterValues.mindPoints.label": "Punti mente:",
        "characterValues.goldCoins.label": "Monete d'oro",
        "characterValues.quests.label": "Impresa",
        "inventory.header": "Inventario",
        "inventory.newItem.label": "Nuovo oggetto:",
        "inventory.newItemButton.label": "Aggiungi",
        "notes.header": "Note",
        "app.downloadButton.label": "Scarica scheda",
        "app.uploadButton.label": "Carica scheda:",
    },
    en: {
        "app.header": "Character sheet",
        "general.name.label": "Name:",
        "general.character.label": "Character:",
        "characterValues.attackDice.label": "Attack dice:",
        "characterValues.defendDice.label": "Defend dice:",
        "characterValues.bodyPoints.label": "Body points:",
        "characterValues.mindPoints.label": "Mind points:",
        "characterValues.goldCoins.label": "Gold coins:",
        "characterValues.quests.label": "Quests:",
        "inventory.header": "Inventory",
        "inventory.newItem.label": "New Item:",
        "inventory.newItemButton.label": "Add",
        "notes.header": "Notes",
        "app.downloadButton.label": "Download sheet",
        "app.uploadButton.label": "Upload sheet:",
    }
}

var locale = "en"
if (typeof navigator !== "undefined") {
    const navigatorLocale = navigator.language
    if (navigatorLocale.toLowerCase().includes("it")) {
        locale = "it"
    }
}

if (typeof document !== "undefined" && typeof document.location !== "undefined" && typeof document.location.search !== "undefined") {
    const searchParams = new URLSearchParams(document.location.search)
    const localeParam = searchParams.get("locale")
    if (localeParam && localeParam.includes("it")) {
        locale = "it"
    }
}

export const getLocale = (): string => {
    return locale
}

export const getLocalisedMessages = (): Messages => {
    const locale = getLocale()
    if (locale == "it") {
        return translations.it
    } else {
        return translations.en
    }
}