import React, { useMemo, useState } from 'react'
import { createEditor, Editor, Node } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'

import { methods } from '../data/editor.json'

const App: React.FC = () => {
  const editor = useMemo(
    () => withReact(createEditor()),
    []
  )

  const [value, setValue] = useState<Node[]>([
    {
      type: 'paragraph',
      children: [
        {
          text: ''
        }
      ],
    }
  ])

  return (
    <div className="c_app">
      <Slate
        editor={editor}
        onChange={setValue}
        value={value}
      >
        <Editable
          className="c_editor"
          onKeyDown={console.log}
        />
      </Slate>

      {
        methods.map(({ args, name }) => (
          <div className="c_method" key={name}>
            <label className="c_method__label">
              <span>Editor.{name}(</span>
                {
                  args.map(
                    (arg, i) => (
                      <div
                        className="c_method__arg"
                        key={arg.name}
                        title={`${arg.name}: ${arg.type}`}
                      >
                        <span
                          className="c_method__arg-label"
                        >{arg.name}</span>

                        <input
                          className="c_method__arg-input"
                          onChange={({ currentTarget }) => {
                            console.log(currentTarget.value)
                          }}
                          placeholder={arg.type}
                          readOnly={i === 0}
                          value={''}
                        />
                      </div>
                    )
                  )
                }
              <span>)</span>
            </label>

            <button onClick={() => {
              const result = (Editor as any)[name](editor)
              console.log('result:', JSON.stringify(result, undefined, 2))
            }}>Go</button>
          </div>
        ))
      }

    </div>
  )
}

export default App
