import React, { useMemo, useState } from 'react'
import { createEditor } from 'slate'
import { Editable, ReactEditor, Slate, withReact } from 'slate-react'
import { CommandResult, EditorCommands, Header, Value } from '.'
import { initialValue } from '../data/value'

const App: React.FC = () => {
  const editor = useMemo(
    () => withReact(createEditor()),
    []
  )

  const [lastResult, setLastResult] = useState('None')
  const [value, setValue] = useState(initialValue)

  return (
    <div className="c_app">
      <Header el="h1"/>

      <Slate
        editor={editor}
        onChange={setValue}
        value={value}
      >
        <Editable
          className="c_editor"
          renderElement={({ attributes, children, element }) => {
            const E = element.type === 'paragraph'
              ? 'p'
              : 'div'

            return (
              <E {...attributes}>{children}</E>
            )
          }}
        />
      </Slate>

      <div className="c_tools">
        <Value
          onUpdate={updatedValue => {
            setValue(updatedValue)
            editor.selection = {
              "anchor": {
                "path": [0],
                "offset": 0
              },
              "focus": {
                "path": [0],
                "offset": 0
              }
            }
            ReactEditor.focus(editor)
          }}
          value={value}
        />
        <EditorCommands
          editor={editor}
          onResult={result => {
            setLastResult(result)
            ReactEditor.focus(editor)
          }}
        />

        <CommandResult
          result={lastResult}
        />
      </div>
    </div>
  )
}

export default App
