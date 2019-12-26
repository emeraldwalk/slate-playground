import React, { useMemo, useState, useEffect } from 'react'
import { createEditor, Editor, Node } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'

import { methods } from '../data/editor.json'

const initialValue: Node[] = [
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

  const [filterBy, setFilterBy] = useState('')
  const [lastResult, setLastResult] = useState('None')
  const [pendingValue, setPendingValue] = useState()
  const [value, setValue] = useState(initialValue)
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

  useEffect(
    () => {
      setPendingValue(
        JSON.stringify(value, undefined, 2)
      )
    },
    [value]
  )

  const filterByLower = filterBy.toLowerCase()

  return (
    <div className="c_app">
      <h1>SlateJS Playground</h1>
      <Slate
        editor={editor}
        onChange={setValue}
        value={value}
      >
        <Editable
          className="c_editor"
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
            }
            catch(e) {}
          }}>Update</button>
        </div>

        <div className="c_methods">
          <h2>Editor Commands</h2>
          <input
            className="c_method-filter"
            onChange={({ currentTarget }) => {
              setFilterBy(currentTarget.value)
            }}
            placeholder="Filter static Editor methods..."
            value={filterBy}
          />
          <div className="scroll">
            {
              methods
                .filter(
                  ({ name }) => name.toLowerCase().indexOf(filterByLower) > -1
                ).map(
                  ({ args, name, returnType, typeParameters }) => (
                    <div className="c_method" key={name}>
                      <label className="c_method__label">
                        <span>Editor.{name}{typeParameters ? `<${typeParameters.join(', ')}>` : ''}(</span>
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
                                  disabled={i === 0}
                                  onChange={({ currentTarget }) => {
                                    setMethodState({
                                      ...methodState,
                                      [name]: {
                                        ...methodState[name],
                                        [arg.name]: currentTarget.value,
                                      },
                                    })
                                  }}
                                  placeholder={i === 0 ? '[Editor Instance]' : arg.type}
                                  readOnly={i === 0}
                                  value={methodState[name][arg.name]}
                                />
                              </div>
                            )
                          )
                        }
                        <span>): {returnType}</span>
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
                          setLastResult(result)
                          console.log('result:', JSON.stringify(result, undefined, 2))
                        }}
                      >Go</button>
                    </div>
                  ))
            }
          </div>
        </div>

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
