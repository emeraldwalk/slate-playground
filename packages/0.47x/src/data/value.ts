import { useState } from 'react';
import { Value } from 'slate';

const initialValue: Value = Value.fromJS({
  document: {
    nodes: [
      {
        nodes: [
          {
            nodes: [
              {
                object: 'text',
                text: 'Block A1',
              },
            ],
            object: 'block',
            type: 'paragraph',
          },
          {
            nodes: [
              {
                object: 'text',
                text: 'Block A2',
              },
            ],
            object: 'block',
            type: 'paragraph',
          }
        ],
        object: 'block',
        type: 'div',
      },
      {
        nodes: [
          {
            object: 'text',
            text: 'Block B',
          },
        ],
        object: 'block',
        type: 'paragraph',
      },
      {
        nodes: [
          {
            object: 'text',
            text: 'Block C'
          },
        ],
        object: 'block',
        type: 'paragraph',
      }
    ]
  }
});

export function useValue() {
  const [value, setValue] = useState(initialValue);
  return {
    initialValue,
    setValue,
    value,
  }
}