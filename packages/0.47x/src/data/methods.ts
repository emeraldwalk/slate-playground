import { useEffect, useMemo, useReducer, useState } from 'react';
import { Editor } from 'slate-react';

export type Action = {
  [P in keyof State]: { type: P, payload: State[P] }
}[keyof State];

export interface State {
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

export function useMethodState(
  editor: Editor | null
) {
  const [methodState, dispatch] = useReducer(reducer, initialState);
  const [additionalMethodNames, setAdditionalMethodNames] = useState<string[]>([]);

  const methodNames = useMemo(
    () => Object.keys(methodState) as (keyof State)[],
    [methodState],
  );

  useEffect(() => {
    if (editor) {
      const notInMethodNames = Object
        .keys(editor)
        .filter(key => typeof editor[key as keyof Editor] === 'function' && !(key in methodState));

      notInMethodNames.sort();

      setAdditionalMethodNames(notInMethodNames);
    }
  }, [editor, methodState]);

  return {
    additionalMethodNames,
    dispatch,
    methodNames,
    methodState,
  };
}