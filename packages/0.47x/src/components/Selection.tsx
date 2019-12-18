import React from 'react';
import { Selection as SlateSelection } from 'slate';

export interface SelectionProps {
  selection: SlateSelection;
}

const Selection: React.FC<SelectionProps> = ({
  selection,
}) => {
  const selectionJson = selection.toJS();

  selectionJson.anchor = {
    key: selection.anchor.key,
    ...selectionJson.anchor,
  };

  selectionJson.focus = {
    key: selection.focus.key,
    ...selectionJson.focus,
  };

  return (
    <div className="c_selection">
      <h2>Selection</h2>
      <pre>
        {
          JSON.stringify(selectionJson, undefined, 2)
        }
      </pre>
    </div>
  );
}

export default Selection;