import { useEffect, useMemo, useReducer, useState } from 'react';
import { Node } from 'slate';
import { Editor } from 'slate-react';
// import { List } from 'immutable';

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
  moveAnchorToEndOfNode: [node],
  moveAnchorToEndOfPreviousBlock: [],
  moveAnchorToEndOfPreviousInline: [],
  moveAnchorToEndOfPreviousText: [],
  moveAnchorToEndOfText: [],
  moveAnchorToStartOfBlock: [],
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
  moveEndTo: ['', 0],
  moveEndToEndOfBlock: [],
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
  moveFocusTo: ['', 0],
  moveFocusToEndOfBlock: [],
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
  // moveNodeByPath: [List<number>([0, 0]), List<number>([0, 0]), 0],
  moveStartBackward: [1],
  moveStartTo: [node.key, 0],
  moveStartToEndOfBlock: [],
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
  moveToEndOfInline: [],
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
  moveToStartOfInline: [],
  moveToStartOfNextInline: [],
  moveToStartOfNextText: [],
  moveToStartOfNode: [node],
  moveToStartOfPreviousBlock: [],
  moveToStartOfPreviousInline: [],
  moveToStartOfPreviousText: [],
  moveToStartOfText: [],
  moveWordBackward: [],
  moveWordForward: [],

  // TODO
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