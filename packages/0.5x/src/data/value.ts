import { Node } from 'slate'

export const initialValue: Node[] = [
  {
    type: 'div',
    children: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'Block A1'
          }
        ],
      },
      {
        type: 'paragraph',
        children: [
          {
            text: 'Block A2'
          }
        ],
      }
    ]
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Block B'
      }
    ]
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Block C'
      }
    ]
  },
]