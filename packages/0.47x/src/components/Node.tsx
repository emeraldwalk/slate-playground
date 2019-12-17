import React from 'react';
import { Node as SlateNode } from 'slate';

export interface NodeProps {
  isSelected: (node: SlateNode) => boolean,
  node: SlateNode,
  onSelect: (node: SlateNode) => void,
}

const Node: React.FC<NodeProps> = ({
  isSelected,
  node,
  onSelect,
}) => {
  const nodes = 'nodes' in node
    ? node.nodes.toArray()
    : [] as SlateNode[];

  const nodeJson = node.toJSON();
  'nodes' in nodeJson && delete nodeJson['nodes'];

  const nodeStr = JSON.stringify({ key: node.key, ...nodeJson }, undefined, 2);

  return (
    <pre
      className={`c_node${isSelected(node) ? ' selected' : ''}`}
      onClick={event => {
        if (node.object === 'text') {
          return;
        }
        event.stopPropagation();
        onSelect(node);
      }}
    >
      {
        node.object === 'text'
          ? nodeStr.replace(/}$/, '},')
          : nodeStr.replace(/\n}$/, ',\n  "nodes": [')
      }
      <pre className="c_node-list">
        {
          nodes.map(child => (
            <React.Fragment
              key={child.key}
            >
              <Node
                isSelected={isSelected}
                onSelect={onSelect}
                node={child}
              />
            </React.Fragment>
          ))
        }
      </pre>
      { node.object !== 'text' && '  ]\n}' }
    </pre>
  );
}

export default Node;