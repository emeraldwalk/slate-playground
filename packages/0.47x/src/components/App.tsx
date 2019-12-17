import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Editor, OnChangeParam } from 'slate-react';
import { Value } from 'slate';

const initialValue: Value = Value.fromJS({
  document: {
    nodes: [
      {
        nodes: [
          {
            nodes: [
              {
                object: 'text',
                text: 'Block A1',
              },
            ],
            object: 'block',
            type: 'paragraph',
          },
          {
            nodes: [
              {
                object: 'text',
                text: 'Block A2',
              },
            ],
            object: 'block',
            type: 'paragraph',
          }
        ],
        object: 'block',
        type: 'div',
      },
      {
        nodes: [
          {
            object: 'text',
            text: 'Block B',
          },
        ],
        object: 'block',
        type: 'paragraph',
      },
      {
        nodes: [
          {
            object: 'text',
            text: 'Block C'
          },
        ],
        object: 'block',
        type: 'paragraph',
      }
    ]
  }
});

type Action = {
  [P in keyof State]: { type: P, payload: State[P] }
}[keyof State];

interface State {
  insertText: [string],
  moveAnchorForward: [number],
  moveAnchorToEndOfDocument: [],
  moveAnchorToStartOfDocument: [],
  moveEndForward: [number],
  moveEndToEndOfDocument: [],
  moveEndToStartOfDocument: [],
  moveFocusForward: [number],
  moveFocusToEndOfDocument: [],
  moveFocusToStartOfDocument: [],
  moveStartForward: [number],
  moveStartToEndOfDocument: [],
  moveStartToStartOfDocument: [],
  moveToEndOfDocument: [],
  moveToStartOfDocument: [],
  moveToStartOfNextBlock: [],
  moveToEndOfNextBlock: [],
  splitBlock: [number],
}

const initialState: State = {
  moveToStartOfDocument: [],
  moveToEndOfDocument: [],
  moveAnchorForward: [1],
  moveFocusForward: [1],
  moveStartForward: [1],
  moveEndForward: [1],

  moveStartToStartOfDocument: [],
  moveStartToEndOfDocument: [],
  moveEndToStartOfDocument: [],
  moveEndToEndOfDocument: [],

  moveAnchorToStartOfDocument: [],
  moveAnchorToEndOfDocument: [],
  moveFocusToStartOfDocument: [],
  moveFocusToEndOfDocument: [],

  moveToStartOfNextBlock: [],
  moveToEndOfNextBlock: [],
  splitBlock: [1],
  insertText: [''],
};

function reducer(
  state: State,
  action: Action,
) {
  return {
    ...state,
    [action.type]: action.payload,
  };
}

function onClick<M extends keyof State>(
  editor: Editor | null,
  method: M,
  ...args: State[M]
) {
  return function doOnClick() {
    (editor?.[method] as any)(...args);
    editor?.focus();
  }
}

function stringifyArgs(args: unknown[]) {
  return args.map(a => typeof a === 'string' ? `'${a}'` : a);
}

const App: React.FC = () => {
  const editorRef = useRef<Editor>(null);
  const [value, setValue] = useState(initialValue);

  const [state, dispatch] = useReducer(reducer, initialState);

  const [additionalMethodNames, setAdditionalMethodNames] = useState<string[]>([]);
  const [filterMethodsBy, setFilterMethodsBy] = useState('');

  function filter(method: string) {
    return filterMethodsBy === '' || method.toLowerCase().indexOf(filterMethodsBy.toLowerCase()) > -1;
  }

  useEffect(() => {
    editorRef.current?.focus();
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      const methodNames = Object
        .keys(editorRef.current)
        .filter(key => typeof editorRef.current![key as keyof Editor] === 'function' && !(key in state));

      methodNames.sort();

      setAdditionalMethodNames(methodNames);
    }
  }, [state]);

  return (
    <div className="c_app">
      <h1>SlateJS Editor Playground</h1>

      <div className="row">
        <Editor
          className="c_editor"
          onChange={({ value }: OnChangeParam) => {
            setValue(value);
          }}
          ref={editorRef}
          value={value}
        />
        <button onClick={() => setValue(initialValue)}>Reset</button>
      </div>

      <div className="row">
        <div className="c_value">
          <h2>Value</h2>
          <div className="scroll">
            <pre>
              {JSON.stringify(value.toJS(), undefined, 2)}
            </pre>
          </div>
        </div>

        <div className="c_controls">
          <h2>Editor Methods</h2>
          <input
            className="c_filter"
            onChange={({ currentTarget }) => setFilterMethodsBy(currentTarget.value)}
            placeholder="Filter..."
            value={filterMethodsBy}
          />
          <div className="scroll">
            {
              Object.keys(state).filter(filter).map(key => {
                const args = state[key as keyof State];

                return (
                  <div className="c_control" key={key}>
                    {
                      (args as unknown[]).map((arg, i) => {
                        return typeof arg === 'string' || typeof arg === 'number' ? (
                          <input
                            key={i}
                            onChange={({ currentTarget }) => {
                              const payload = args.slice();

                              const argValue = typeof payload[i] === 'number'
                                ? isNaN(Number(currentTarget.value)) ? payload[i] : Number(currentTarget.value)
                                : currentTarget.value;

                              payload[i] = argValue;

                              const action = {
                                type: key,
                                payload,
                              } as Action;

                              dispatch(action);
                            }}
                            value={arg}
                          />
                        ) : null
                      })
                    }
                    <button
                      onClick={onClick(editorRef.current!, key as keyof State, ...args)}
                    >{key}({stringifyArgs(args)})
                  </button>
                  </div>
                )
              })
            }

            <h2>Additional Methods</h2>
            <ul className="c_additional-methods">
              {
                additionalMethodNames
                  .filter(
                    filter
                  )
                  .map(method => <li key={method}>{method}</li>)
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
