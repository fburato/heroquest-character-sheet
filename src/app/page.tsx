'use client'
import React, { FC, useState } from "react"
import CharacterSheet from "./components/character_sheet"
import { Provider, useDispatch, useSelector } from "react-redux"
import store from './store'
import { SummarisedState } from "./store"
import { loadAction } from "./reducer"

const App: FC<unknown> = () => {
  const summary = useSelector<{ summary: SummarisedState }>(state => state.summary)
  const dispatch = useDispatch()
  const [fileValue, setFileValue] = useState<string>("")
  return (<main>
    <div>
      <CharacterSheet />

      <div className="stateManager">
        <a href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(summary))}`} download={"state.json"} className="downloadButton">
          <button>Download character sheet</button>
        </a>
        <div className="uploadButton">
          <label htmlFor="file" id="fileLabel" >Upload character sheet:</label>
          <input type="file" name="file" onChange={async (event) => {
            const fileList = event.target.files
            if (fileList && event.target.value) {
              setFileValue(event.target.value)
              const [file] = fileList
              const fileContent = await file.text()
              dispatch(loadAction(JSON.parse(fileContent) as SummarisedState))
              setFileValue("")
            }
          }} value={fileValue} />
        </div>
      </div>
    </div>
  </main>)
}

export default function Home() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}
