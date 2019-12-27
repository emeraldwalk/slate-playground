import { Editor } from 'slate'
import { Method } from '../data/editor'

export function buildArg(
  methods: Method[],
  arg: Method['args'][0],
  value: string,
) {
  if (arg.type === 'string') {
    return value
  }

  let parsed
  try {
    parsed = JSON.parse(value)
  }
  catch (e) {
    parsed = value
  }

  return value
    ? parsed
    : undefined
}

export function isArgValid(
  arg: Method['args'][0],
  value: string,
): boolean {
  if (arg.type === 'string') {
    return true
  }

  let parsed
  try {
    parsed = JSON.parse(value)
  }
  catch (e) {
    parsed = value
  }

  return (arg.isOptional && value === '') || parsed
}

export function runCommand(
  name: string,
  editor: Editor,
  ...args: unknown[]
) {
  console.log('runCommand:', name, '[editor]', ...args)
  return (Editor as any)[name](editor, ...args)
}