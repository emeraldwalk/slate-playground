import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Editor, OnChangeParam } from 'slate-react';
import { Node as SlateNode } from 'slate';
import { List } from 'immutable';
import { Document, Selection } from '.';
import { useFilter } from '../data/filter';
import { Action, useMethodState, State } from '../data/methods';
import { useDocument } from '../data/node';
import { useValue } from '../data/value';
import { nodeSummary } from '../data/utils';

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
  return args.map(
    a =>
      typeof a === 'string' ? `'${a}'`
        : typeof a === 'number' ? a
          : a instanceof List ? `List([${(a as any).toArray()}])`
            : typeof a === 'object' ? '[selected node]'
              : String(a)
  ).join(', ');
}

const App: React.FC = () => {
  const editorRef = useRef<Editor>(null);

  const { initialValue, setValue, value } = useValue();
  const [filterBy, setFilterBy] = useState('');

  const { documentNode, selectedNodes } = useDocument(value);

  const {
    additionalMethodNames,
    dispatch,
    dispatchPending,
    methodNames,
    methodState,
    pendingMethodState,
  } = useMethodState(editorRef.current, selectedNodes[0] || value.document.getFirstText());

  const filteredAdditionalMethodNames = useFilter(
    additionalMethodNames,
    filterBy
  );

  const filteredMethodNames = useFilter(
    methodNames,
    filterBy
  );

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
      <div className="row">
        <div className="main">
          <h1>SlateJS Playground</h1>

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

          <div className="data row">
            <div className="c_summary">
              <h2>Summary</h2>
              {
                nodeSummary(value.document).map(nodeStr => (
                  <pre>{nodeStr}</pre>
                ))
              }
            </div>

            <Document
              onSelect={onSelect}
              node={documentNode}
            />

            <Selection
              selection={value.selection}
            />
          </div>
        </div>

        <div className="sidebar">
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
                  const pendingArgs = pendingMethodState[key]!;
                  const currentArgs = methodState[key]!;

                  return (
                    <div className="c_control" key={key}>
                      {
                        (pendingArgs as unknown[]).map((pendingArg, i) => {
                          if (pendingArg instanceof List) {
                            pendingArg = (pendingArg as any).toArray().join(',');
                          }

                          let title = typeof currentArgs[i] as string;
                          if (title === 'object' && currentArgs[i] instanceof List) {
                            title = 'List';
                          }

                          return typeof pendingArg === 'string' || typeof pendingArg === 'number' ? (
                            <input
                              key={i}
                              onBlur={() => {
                                const payload = pendingArgs.slice();

                                if (typeof currentArgs[i] === 'number' && isNaN(payload[i])) {
                                  payload[i] = currentArgs[i];
                                }
                                else if (currentArgs[i] instanceof List) {
                                  const values = String(pendingArgs[i]).split(',').map(v => Number(v.trim()));
                                  if (values.some(isNaN)) {
                                    payload[i] = currentArgs[i];
                                  }
                                  else {
                                    payload[i] = List(values);
                                  }
                                }

                                const action = {
                                  type: key,
                                  payload,
                                } as Action;

                                dispatchPending(action);
                                dispatch(action);
                              }}
                              onChange={({ currentTarget }) => {
                                const payload = pendingArgs.slice();
                                payload[i] = currentTarget.value;

                                const action = {
                                  type: key,
                                  payload,
                                } as Action;

                                dispatchPending(action);
                              }}
                              title={title}
                              value={pendingArg}
                            />
                          ) : null
                        })
                      }
                      <button
                        onClick={onClick(editorRef.current!, key as keyof State, ...pendingArgs)}
                      >{key}({stringifyArgs(currentArgs)})
                  </button>
                    </div>
                  )
                })
              }

              <h2>TODO: Additional Methods</h2>
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
      <footer className="footer">
        <span>slate v0.47.9 slate-react v0.22.10</span>
      </footer>
    </div>
  );
}

export default App;
