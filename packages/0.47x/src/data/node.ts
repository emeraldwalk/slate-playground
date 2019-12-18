import { useMemo } from 'react';
import { Value } from 'slate';
import { nodeTree, selectedTextNodes } from './utils';

export function useDocument(
  value: Value,
) {
  return useMemo(
    () => {
      const selectedTextKeys = Array.from(selectedTextNodes(value)).map(n => n.key);
      return nodeTree(value.document, selectedTextKeys);
    },
    [value]
  );
}