import React, { useMemo, useState, useEffect } from 'react'
import { createEditor, Node } from 'slate'
import { Editable, ReactEditor, Slate, withReact } from 'slate-react'
import { Header, Methods } from '.'

const initialValue: Node[] = [
  {
    type: 'div',
    children: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'Block A1'
          }
        ],
      },
      {
        type: 'paragraph',
        children: [
          {
            text: 'Block A2'
          }
        ],
      }
    ]
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Block B'
      }
    ]
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Block C'
      }
    ]
  },
]

function resultAsString(
  result: any
) {
  if (typeof result === 'undefined') {
    return 'undefined'
  }

  if (typeof result === 'object') {
    return JSON.stringify(result, undefined, 2)
  }

  return String(result)
}

const App: React.FC = () => {
  const editor = useMemo(
    () => withReact(createEditor()),
    []
  )

  const [lastResult, setLastResult] = useState('None')
  const [pendingValue, setPendingValue] = useState()
  const [value, setValue] = useState(initialValue)

  useEffect(
    () => {
      setPendingValue(
        JSON.stringify(value, undefined, 2)
      )
    },
    [value]
  )

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
        <div className="c_value">
          <h2>Value</h2>
          <textarea
            onChange={({ currentTarget }) => {
              setPendingValue(currentTarget.value)
            }}
            value={pendingValue}
          />
          <button onClick={() => {
            try {
              setValue(JSON.parse(pendingValue))
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
            }
            catch(e) {
              alert('Value could not be parsed.')
            }
          }}>Update</button>
        </div>

        <Methods
          editor={editor}
          onResult={result => {
            setLastResult(result)
            ReactEditor.focus(editor)
          }}
        />

        <div className="c_result">
          <h2>Result</h2>
          <pre>
            {
              resultAsString(lastResult)
            }
          </pre>
        </div>
      </div>
    </div>
  )
}

export default App
