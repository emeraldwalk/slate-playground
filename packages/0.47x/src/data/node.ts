import { useMemo } from 'react';
import { Value } from 'slate';
import { nodeTree, selectedTextNodes } from './utils';

export function useDocument(
  value: Value,
) {
  return useMemo(
    () => {
      const selectedNodes = Array.from(selectedTextNodes(value));
      const selectedTextKeys = selectedNodes.map(n => n.key);

      return {
        documentNode: nodeTree(value.document, selectedTextKeys, []),
        selectedNodes,
      };
    },
    [value]
  );
}