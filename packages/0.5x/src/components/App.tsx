import React, { useMemo, useState } from 'react'
import { createEditor, Editor, Node } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'

import { methods } from '../data/editor.json'

const initialValue = [
  {
    type: 'div',
    children: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'Path 000'
          }
        ],
      },
      {
        type: 'paragraph',
        children: [
          {
            text: 'Path 001'
          }
        ],
      }
    ]
  },
]

function buildArg(
  arg: (typeof methods)[0]['args'][0],
  value: string,
) {
  if (arg.type === 'string') {
    return value
  }

  let parsed
  try {
    parsed = JSON.parse(value)
  }
  catch (e) {
    parsed = value
  }

  return value
    ? parsed
    : undefined
}

function isArgValid(
  arg: (typeof methods)[0]['args'][0],
  value: string,
): boolean {
  if (arg.type === 'string') {
    return true
  }

  let parsed
  try {
    parsed = JSON.parse(value)
  }
  catch (e) {
    parsed = value
  }

  return (arg.isOptional && value === '') || parsed
}

function runCommand(
  name: string,
  editor: Editor,
  ...args: unknown[]
) {
  console.log('runCommand:', name, '[editor]', ...args)
  return (Editor as any)[name](editor, ...args)
}

const App: React.FC = () => {
  const editor = useMemo(
    () => withReact(createEditor()),
    []
  )

  const [value, setValue] = useState<Node[]>(initialValue)
  const [methodState, setMethodState] = useState(() =>
    methods.reduce(
      (memo, method) => {
        memo[method.name] = method.args.reduce((memo, arg) => {
          memo[arg.name] = ''
          return memo
        }, {} as Record<string, string>)
        return memo
      },
      {} as Record<string, Record<string, string>>
    )
  )

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

      <div className="c_tools">
        <div className="c_methods">
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
                          >{arg.name}{arg.isOptional ? '?' : ''}</span>

                          <input
                            className="c_method__arg-input"
                            onChange={({ currentTarget }) => {
                              setMethodState({
                                ...methodState,
                                [name]: {
                                  ...methodState[name],
                                  [arg.name]: currentTarget.value,
                                },
                              })
                            }}
                            placeholder={arg.type}
                            readOnly={i === 0}
                            value={methodState[name][arg.name]}
                          />
                        </div>
                      )
                    )
                  }
                  <span>)</span>
                </label>

                <button
                  disabled={args.slice(1).some(a => !isArgValid(a, methodState[name][a.name]))}
                  onClick={() => {
                    const result = runCommand(
                      name,
                      editor,
                      ...args.slice(1).map(
                        a => buildArg(
                          a,
                          methodState[name][a.name]
                        )
                      )
                    )
                    console.log('result:', JSON.stringify(result, undefined, 2))
                  }}
                >Go</button>
              </div>
            ))
          }
        </div>

        <div className="c_value">
          <h2>Value</h2>
          <pre>
            {JSON.stringify(value, undefined, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default App
