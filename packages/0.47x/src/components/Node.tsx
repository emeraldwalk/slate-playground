import React from 'react';
import { Node as SlateNode } from 'slate';
import { Node as DataNode } from '../utils/data';

export interface NodeProps {
  node: DataNode,
  onSelect: (node: SlateNode) => void,
}

const Node: React.FC<NodeProps> = ({
  node,
  onSelect,
}) => {
  const {
    _slateNode,
    isSelected,
    nodes = [],
    ...rest
  } = node;
  const nodeStr = JSON.stringify(rest, undefined, 2);

  return (
    <pre
      className={`c_node${node.isSelected ? ' selected' : ''}`}
      onClick={event => {
        event.stopPropagation();
        onSelect(node._slateNode);
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