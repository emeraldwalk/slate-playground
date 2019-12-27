import React, { useEffect, useState } from 'react'

export interface JsonEditProps<T> {
  isReadOnly?: boolean,
  label: string,
  onUpdate: (value: T) => void,
  value: T,
}

const JsonEdit = <T extends any>({
  isReadOnly,
  label,
  onUpdate,
  value,
}: JsonEditProps<T>) => {
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
    <div className="c_json-edit">
      <h2>{label}</h2>
      <textarea
        onChange={({ currentTarget }) => {
          setPendingValue(currentTarget.value)
        }}
        readOnly={!!isReadOnly}
        value={pendingValue}
      />
      {
        !isReadOnly && <button onClick={() => {
          try {
            onUpdate(JSON.parse(pendingValue))
          }
          catch (e) {
            alert('Json could not be parsed.')
          }
        }}>Update</button>
      }
    </div>
  )
}

export default JsonEdit