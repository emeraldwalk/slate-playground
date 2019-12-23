import React, { useMemo, useState } from 'react'
import { createEditor, Editor, Node } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'

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

  const methodArgsReg = /\(([^)]+)\)/

  const methods = Object
    .entries(Editor)
    .map(([methodName, method]) => {
      const [, args] = String(method).match(methodArgsReg) || []
      return {
        args: args.replace(/ /, '').split(','),
        name: methodName as keyof typeof Editor,
      }
    })

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
          <div key={name}>
            <span>{name}({args.join(', ')})</span>
            {
              args.slice(1).map(
                arg => (
                  <input
                    key={arg}
                    onChange={({ currentTarget }) => {
                      console.log(currentTarget.value)
                    }}
                    value={''}
                  />
                )
              )
            }
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
