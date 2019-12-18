import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Editor, OnChangeParam } from 'slate-react';
import { Node as SlateNode } from 'slate';
import { Node, Selection } from '.';
import { useFilter } from '../data/filter';
import { Action, useMethodState, State } from '../data/methods';
import { useDocument } from '../data/node';
import { useValue } from '../data/value';

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

  const { initialValue, setValue, value } = useValue();
  const [filterBy, setFilterBy] = useState('');

  const {
    additionalMethodNames,
    dispatch,
    methodNames,
    methodState,
  } = useMethodState(editorRef.current);

  const filteredAdditionalMethodNames = useFilter(
    additionalMethodNames,
    filterBy
  );

  const filteredMethodNames = useFilter(
    methodNames,
    filterBy
  );

  const documentNode = useDocument(value);

  const onSelect = useCallback((node: SlateNode) => {
    editorRef.current!.moveAnchorToStartOfNode(node);
    editorRef.current!.moveFocusToEndOfNode(node);

    editorRef.current!.focus();
  }, []);

  useEffect(() => {
    editorRef.current?.focus();
  }, []);

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
        <button onClick={() => {
          setValue(initialValue);
        }}>Reset</button>
      </div>

      <div className="row">
        <Selection
          selection={value.selection}
        />

        <div className="c_document">
          <h2>Document</h2>
          <div className="scroll">
            <Node
              onSelect={onSelect}
              node={documentNode}
            />
          </div>
        </div>

        <div className="c_controls">
          <h2>Editor Methods</h2>
          <input
            className="c_filter"
            onChange={({ currentTarget }) => setFilterBy(currentTarget.value)}
            placeholder="Filter..."
            value={filterBy}
          />
          <div className="scroll">
            {
              filteredMethodNames.map(key => {
                const args = methodState[key];

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
                filteredAdditionalMethodNames
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
