import React, { useEffect, useState } from 'react'
import { Node } from 'slate'

export interface ValueProps {
  onUpdate: (value: Node[]) => void,
  value: Node[],
}

const Value: React.FC<ValueProps> = ({
  onUpdate,
  value,
}) => {
  const [pendingValue, setPendingValue] = useState()

  useEffect(
    () => {
      setPendingValue(
        JSON.stringify(value, undefined, 2)
      )
    },
    [value]
  )

  return (
    <div className="c_value">
      <h2>Value</h2>
      <textarea
        onChange={({ currentTarget }) => {
          setPendingValue(currentTarget.value)
        }}
        value={pendingValue}
      />
      <button onClick={() => {
        try {
          onUpdate(JSON.parse(pendingValue))
        }
        catch (e) {
          alert('Value could not be parsed.')
        }
      }}>Update</button>
    </div>
  )
}

export default Value