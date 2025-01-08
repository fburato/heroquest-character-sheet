'use client'
import React, { useState } from "react"
import CharacterSheet from "./components/character_sheet"
import { Provider } from "react-redux"
import store from './store'

type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue }

// interface JSONObject {
//   [k: string]: JSONValue
// }

export default function Home() {
  const [fileContent, setFileContent] = useState<JSONValue | null>(null)

  return (
    <React.StrictMode>
      <Provider store={store}>
        <main>
          <div>
            <CharacterSheet />
            <input type="file" name="file" onChange={async (event) => {
              const fileList = event.target.files
              if (fileList) {
                const [file] = fileList
                const fileContent = await file.text()
                setFileContent(JSON.parse(fileContent) as JSONValue)
              }
            }} />
            {!fileContent ? <></> : <a href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(fileContent))}`} download={"state.json"}><button>Download content</button></a>}
            <div>
              {!fileContent ? (<p>File not read yet</p>) : (<div><p>File content:</p><p>{JSON.stringify(fileContent)}</p></div>)}
            </div>
          </div>
        </main>
      </Provider>
    </React.StrictMode>
  );
}
