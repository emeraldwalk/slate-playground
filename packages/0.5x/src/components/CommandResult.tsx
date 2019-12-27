import React from 'react'

function resultAsString(
  result: any
) {
  if (typeof result === 'undefined') {
    return 'undefined'
  }

  if (typeof result === 'object') {
    return JSON.stringify(result, undefined, 2)
  }

  return String(result)
}

export interface CommandResultProps {
  result: any,
}

const CommandResult: React.FC<CommandResultProps> = ({
  result,
}) => {
  return (
    <div className="c_command-result">
      <h2>Result</h2>
      <pre>
        {
          resultAsString(result)
        }
      </pre>
    </div>
  )
}

export default CommandResult