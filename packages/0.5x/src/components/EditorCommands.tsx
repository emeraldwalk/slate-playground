import React, { useState } from 'react'
import { Editor } from 'slate'
import { ReactEditor } from 'slate-react'
import { methods } from '../data/editor'
import {
  buildArg,
  isArgValid,
  runCommand
} from '../util/command'

export interface EditorCommandsProps {
  editor: Editor & ReactEditor,
  onResult: (result: any) => void,
}

const EditorCommands: React.FC<EditorCommandsProps> = ({
  editor,
  onResult,
}) => {
  const [filterBy, setFilterBy] = useState('')
  const filterByLower = filterBy.toLowerCase()

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
                            methods,
                            a,
                            methodState[name][a.name]
                          )
                        )
                      )
                      ReactEditor.focus(editor)
                      console.log('result:', JSON.stringify(result, undefined, 2))
                      onResult(result)
                    }}
                  >Go</button>
                </div>
              ))
        }
      </div>
    </div>
  )
}

export default EditorCommands