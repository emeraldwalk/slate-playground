import { useEffect, useMemo, useReducer, useState } from 'react';
import { Editor } from 'slate-react';

type MethodKey = { [P in keyof Required<Editor>]: Editor[P] extends Function ? P : never }[keyof Editor];

export type Action = {
  [P in MethodKey]: { type: P, payload: State[P] }
}[MethodKey];

export type State = {
  [P in MethodKey]: Editor[P] extends (...args: infer A) => any
    ? A
    : never
};

const initialState: Partial<State> = {
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

  moveToStartOfBlock: [],
  moveAnchorBackward: [1],
  moveAnchorTo: [''],
  moveAnchorToEndOfBlock: [],
  moveAnchorToEndOfInline: [],
  moveAnchorToEndOfNextBlock: [],
  moveAnchorToEndOfNextInline: [],
  moveAnchorToEndOfNextText: [],
  // moveAnchorToEndOfNode: [],
  moveAnchorToEndOfPreviousBlock: [],
  moveAnchorToEndOfPreviousInline: [],
  moveAnchorToEndOfPreviousText: [],
  moveAnchorToEndOfText: [],
  moveAnchorToStartOfBlock: [],
  moveAnchorToStartOfInline: [],
  moveAnchorToStartOfNextBlock: [],
  moveAnchorToStartOfNextInline: [],
  moveAnchorToStartOfNextText: [],
  // moveAnchorToStartOfNode: [],
  moveAnchorToStartOfPreviousBlock: [],
  moveAnchorToStartOfPreviousInline: [],
  moveAnchorToStartOfPreviousText: [],
  moveAnchorToStartOfText: [],
  moveAnchorWordBackward: [],
  moveAnchorWordForward: [],
  moveBackward: [1],
  moveEndBackward: [1],
  moveEndTo: ['', 0],
  moveEndToEndOfBlock: [],
  moveEndToEndOfInline: [],
  moveEndToEndOfNextBlock: [],
  moveEndToEndOfNextInline: [],
  moveEndToEndOfNextText: [],
  // moveEndToEndOfNode: [],
  moveEndToEndOfPreviousBlock: [],
  moveEndToEndOfPreviousInline: [],
  moveEndToEndOfPreviousText: [],
  moveEndToEndOfText: [],
  moveEndToStartOfBlock: [],
  moveEndToStartOfInline: [],
  moveEndToStartOfNextBlock: [],
  moveEndToStartOfNextInline: [],
  moveEndToStartOfNextText: [],
  // moveEndToStartOfNode: [],
  moveEndToStartOfPreviousBlock: [],
  moveEndToStartOfPreviousInline: [],
  moveEndToStartOfPreviousText: [],
  moveEndToStartOfText: [],
  moveEndWordBackward: [],
  moveEndWordForward: [],
  moveFocusBackward: [1],
  moveFocusTo: ['', 0],
  moveFocusToEndOfBlock: [],
  moveFocusToEndOfInline: [],
  moveFocusToEndOfNextBlock: [],
  moveFocusToEndOfNextInline: [],
  moveFocusToEndOfNextText: [],
  // moveFocusToEndOfNode: [],
  moveFocusToEndOfPreviousBlock: [],
  moveFocusToEndOfPreviousInline: [],
  moveFocusToEndOfPreviousText: [],
  moveFocusToEndOfText: [],
  moveFocusToStartOfBlock: [],
  moveFocusToStartOfInline: [],
  moveFocusToStartOfNextBlock: [],
  moveFocusToStartOfNextInline: [],
  moveFocusToStartOfNextText: [],
  // moveFocusToStartOfNode: [],
  moveFocusToStartOfPreviousBlock: [],
  moveFocusToStartOfPreviousInline: [],
  moveFocusToStartOfPreviousText: [],
  moveFocusToStartOfText: [],
  moveFocusWordBackward: [],
  moveFocusWordForward: [],
  moveForward: [1],
  moveNodeByKey: ['', '', 0],
  // moveNodeByPath: [],
  moveStartBackward: [1],
  moveStartTo: ['', 0],
  moveStartToEndOfBlock: [],

  // TODO
};

function reducer(
  state: Partial<State>,
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