import { useEffect, useMemo, useReducer, useState } from 'react';
import { Node } from 'slate';
import { Editor } from 'slate-react';
import { List } from 'immutable';

type MethodKey = { [P in keyof Required<Editor>]: Editor[P] extends Function ? P : never }[keyof Editor];

export type Action = {
  [P in MethodKey]: {
    type: P,
    payload: State[P],
  }
}[MethodKey];

export type State = {
  [P in MethodKey]: Editor[P] extends (...args: infer A) => any
    ? A
    : never
};

const initialState = (
  node: Node,
): Partial<State> => ({
  undo: [],

  insertBlock: ['div'],
  insertInline: ['span'],
  insertText: ['hello'],
  moveAnchorBackward: [1],
  moveAnchorForward: [1],
  moveAnchorTo: [''],
  moveAnchorToEndOfBlock: [],
  moveAnchorToEndOfDocument: [],
  moveAnchorToEndOfInline: [],
  moveAnchorToEndOfNextBlock: [],
  moveAnchorToEndOfNextInline: [],
  moveAnchorToEndOfNextText: [],
  moveAnchorToEndOfNode: [node],
  moveAnchorToEndOfPreviousBlock: [],
  moveAnchorToEndOfPreviousInline: [],
  moveAnchorToEndOfPreviousText: [],
  moveAnchorToEndOfText: [],
  moveAnchorToStartOfBlock: [],
  moveAnchorToStartOfDocument: [],
  moveAnchorToStartOfInline: [],
  moveAnchorToStartOfNextBlock: [],
  moveAnchorToStartOfNextInline: [],
  moveAnchorToStartOfNextText: [],
  moveAnchorToStartOfNode: [node],
  moveAnchorToStartOfPreviousBlock: [],
  moveAnchorToStartOfPreviousInline: [],
  moveAnchorToStartOfPreviousText: [],
  moveAnchorToStartOfText: [],
  moveAnchorWordBackward: [],
  moveAnchorWordForward: [],
  moveBackward: [1],
  moveEndBackward: [1],
  moveEndForward: [1],
  moveEndTo: ['', 0],
  moveEndToEndOfBlock: [],
  moveEndToEndOfDocument: [],
  moveEndToEndOfInline: [],
  moveEndToEndOfNextBlock: [],
  moveEndToEndOfNextInline: [],
  moveEndToEndOfNextText: [],
  moveEndToEndOfNode: [node],
  moveEndToEndOfPreviousBlock: [],
  moveEndToEndOfPreviousInline: [],
  moveEndToEndOfPreviousText: [],
  moveEndToEndOfText: [],
  moveEndToStartOfBlock: [],
  moveEndToStartOfDocument: [],
  moveEndToStartOfInline: [],
  moveEndToStartOfNextBlock: [],
  moveEndToStartOfNextInline: [],
  moveEndToStartOfNextText: [],
  moveEndToStartOfNode: [node],
  moveEndToStartOfPreviousBlock: [],
  moveEndToStartOfPreviousInline: [],
  moveEndToStartOfPreviousText: [],
  moveEndToStartOfText: [],
  moveEndWordBackward: [],
  moveEndWordForward: [],
  moveFocusBackward: [1],
  moveFocusForward: [1],
  moveFocusTo: ['', 0],
  moveFocusToEndOfBlock: [],
  moveFocusToEndOfDocument: [],
  moveFocusToEndOfInline: [],
  moveFocusToEndOfNextBlock: [],
  moveFocusToEndOfNextInline: [],
  moveFocusToEndOfNextText: [],
  moveFocusToEndOfNode: [node],
  moveFocusToEndOfPreviousBlock: [],
  moveFocusToEndOfPreviousInline: [],
  moveFocusToEndOfPreviousText: [],
  moveFocusToEndOfText: [],
  moveFocusToStartOfBlock: [],
  moveFocusToStartOfDocument: [],
  moveFocusToStartOfInline: [],
  moveFocusToStartOfNextBlock: [],
  moveFocusToStartOfNextInline: [],
  moveFocusToStartOfNextText: [],
  moveFocusToStartOfNode: [node],
  moveFocusToStartOfPreviousBlock: [],
  moveFocusToStartOfPreviousInline: [],
  moveFocusToStartOfPreviousText: [],
  moveFocusToStartOfText: [],
  moveFocusWordBackward: [],
  moveFocusWordForward: [],
  moveForward: [1],
  moveNodeByKey: ['', '', 0],
  moveNodeByPath: [List<number>([0, 0]), List<number>([0, 0]), 0],
  moveStartBackward: [1],
  moveStartForward: [1],
  moveStartTo: [node.key, 0],
  moveStartToEndOfBlock: [],
  moveStartToEndOfDocument: [],
  moveStartToEndOfInline: [],
  moveStartToEndOfNextBlock: [],
  moveStartToEndOfNextInline: [],
  moveStartToEndOfNextText: [],
  moveStartToEndOfNode: [node],
  moveStartToEndOfPreviousBlock: [],
  moveStartToEndOfPreviousInline: [],
  moveStartToEndOfPreviousText: [],
  moveStartToEndOfText: [],
  moveStartToStartOfBlock: [],
  moveStartToStartOfDocument: [],
  moveStartToStartOfInline: [],
  moveStartToStartOfNextBlock: [],
  moveStartToStartOfNextInline: [],
  moveStartToStartOfNextText: [],
  moveStartToStartOfNode: [node],
  moveStartToStartOfPreviousBlock: [],
  moveStartToStartOfPreviousInline: [],
  moveStartToStartOfPreviousText: [],
  moveStartToStartOfText: [],
  moveStartWordBackward: [],
  moveStartWordForward: [],
  moveTo: [''],
  moveToAnchor: [],
  moveToEnd: [],
  moveToEndOfBlock: [],
  moveToEndOfDocument: [],
  moveToEndOfInline: [],
  moveToEndOfNextBlock: [],
  moveToEndOfNextInline: [],
  moveToEndOfNextText: [],
  moveToEndOfNode: [node],
  moveToEndOfPreviousBlock: [],
  moveToEndOfPreviousInline: [],
  moveToEndOfPreviousText: [],
  moveToEndOfText: [],
  moveToFocus: [],
  moveToRangeOfDocument: [],
  moveToRangeOfNode: [node],
  moveToStart: [],
  moveToStartOfBlock: [],
  moveToStartOfDocument: [],
  moveToStartOfInline: [],
  moveToStartOfNextBlock: [],
  moveToStartOfNextInline: [],
  moveToStartOfNextText: [],
  moveToStartOfNode: [node],
  moveToStartOfPreviousBlock: [],
  moveToStartOfPreviousInline: [],
  moveToStartOfPreviousText: [],
  moveToStartOfText: [],
  moveWordBackward: [],
  moveWordForward: [],
  splitBlock: [1],
});

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
  editor: Editor | null,
  node: Node,
) {
  const [methodState, dispatch] = useReducer(reducer, initialState(node));
  const [pendingMethodState, dispatchPending] = useReducer(reducer, methodState);
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
    dispatchPending,
    methodNames,
    methodState,
    pendingMethodState,
  };
}