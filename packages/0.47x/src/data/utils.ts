import {
  Node as SlateNode,
  NodeJSON,
  Value,
} from 'slate';

export type Node = { isSelected: boolean, nodes?: Node[], _slateNode: SlateNode } & NodeJSON;

/**
 * Transform a Slate node tree into a data model.
 */
export function nodeTree(
  node: SlateNode,
  selectedKeys: string[]
): Node {
  if (node.object === 'text') {
    return {
      key: node.key,
      isSelected: selectedKeys.indexOf(node.key) > -1,
      object: node.object,
      _slateNode: node,
    };
  }

  const childNodes = node.nodes.toArray().map(
    child => nodeTree(child, selectedKeys),
  );

  return {
    key: node.key,
    ...node.toJSON() as any,
    isSelected: childNodes.every(childNodes => childNodes.isSelected),
    nodes: childNodes,
    _slateNode: node,
  };
}

/**
 * Get an iterable that yields selected text nodes.
 * @param value
 */
export function* selectedTextNodes(value: Value): IterableIterator<SlateNode> {
  const stack: SlateNode[] = [value.document];

  let isInSelection = false;

  while (stack.length > 0) {
    const node = stack.shift()!;

    if (node.key === value.selection.start.key) {
      isInSelection = true;
    }

    if (node.object !== 'text') {
      stack.unshift(...node.nodes.toArray());
    }
    else if (isInSelection) {
      yield node;
    }

    if (node.key === value.selection.end.key) {
      isInSelection = false;
    }
  }
}