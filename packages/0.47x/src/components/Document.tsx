import React from 'react';
import { Node as SlateNode } from 'slate';
import { Node } from '.';
import { Node as DataNode } from '../data/utils';

export interface DocumentProps {
  node: DataNode;
  onSelect: (node: SlateNode) => void;
}

const Document: React.FC<DocumentProps> = ({
  node,
  onSelect,
}) => {
  return (
    <div className="c_document">
      <h2>Document</h2>
      <div className="scroll">
        <Node
          onSelect={onSelect}
          node={node}
        />
      </div>
    </div>
  );
};

export default Document;