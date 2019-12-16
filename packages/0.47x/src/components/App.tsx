import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Editor, OnChangeParam } from 'slate-react';
import { Value } from 'slate';

const initialValue: Value = Value.fromJS({
  document: {
    nodes: [
      {
        nodes: [
          {
            object: 'text',
            text: 'Block A'
          },
        ],
        object: 'block',
        type: 'paragraph',
      },
      {
        nodes: [
          {
            object: 'text',
            text: 'Block B'
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
  moveAnchorForward: [number],
  moveEndForward: [number],
  moveFocusForward: [number],
  moveStartForward: [number],
  moveToEndOfDocument: [],
  moveToStartOfDocument: [],
}

const initialState: State = {
  moveToStartOfDocument: [],
  moveToEndOfDocument: [],
  moveAnchorForward: [1],
  moveFocusForward: [1],
  moveStartForward: [1],
  moveEndForward: [1],
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
    editor?.[method](...args);
    editor?.focus();
  }
}

const App: React.FC = () => {
  const editorRef = useRef<Editor>(null);
  const [value, setValue] = useState(initialValue);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    editorRef.current?.focus();
  }, []);

  return (
    <div className="c_app">
      <h1>SlateJS Editor Playground</h1>

      <Editor
        className="c_editor"
        onChange={({ value }: OnChangeParam) => {
          setValue(value);
        }}
        ref={editorRef}
        value={value}
      />

      <div className="row">
        <pre className="c_value">
          {JSON.stringify(value.toJS(), undefined, 2)}
        </pre>

        <div className="c_controls">
          {
            Object.keys(state).map(key => {
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
                            payload[i] = currentTarget.value as any;

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
                  >{key}({args.join(',')})
                  </button>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
