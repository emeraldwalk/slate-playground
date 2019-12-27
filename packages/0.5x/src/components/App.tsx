import React, { useMemo, useState } from 'react'
import { createEditor } from 'slate'
import { Editable, ReactEditor, Slate, withReact } from 'slate-react'
import { CommandResult, EditorCommands, Header, JsonEdit } from '.'
import { initialValue } from '../data/value'

const App: React.FC = () => {
  const editor = useMemo(
    () => withReact(createEditor()),
    []
  )

  const [lastResult, setLastResult] = useState('None')
  const [selection, setSelection] = useState(editor.selection)
  const [value, setValue] = useState(initialValue)

  return (
    <div className="c_app">
      <Header el="h1"/>

      <Slate
        editor={editor}
        onChange={value => {
          const isFocused = ReactEditor.isFocused(editor)

          // this may have unintended side effects but
          // trying to avoid the selection state being
          // cleared if we want to edit it via <JsonEdit/>
          if (isFocused) {
            setSelection(editor.selection)
          }
          setValue(value)
        }}
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
        <JsonEdit
          isReadOnly={true}
          label="Selection"
          onUpdate={updated => {
            ReactEditor.focus(editor)
            editor.selection = updated
            console.log(editor.selection)
          }}
          value={selection}
        />
        <JsonEdit
          label="Value"
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
