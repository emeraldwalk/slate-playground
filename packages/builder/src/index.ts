import * as ts from "typescript";
import {
  createDepthFirstTraverse,
  createSerializeSignature,
  createToJson,
  find,
  getChildNodes,
} from './util';

parse(process.argv[2])

function parse(file: string): void {
  const program = ts.createProgram([file], { allowJs: true })
  const sourceFile = program.getSourceFile(file)
  const checker = program.getTypeChecker()
  const serializeSignature = createSerializeSignature(checker)

  const dfs = createDepthFirstTraverse(
    getChildNodes,
  )

  const [editorConstValue] = find(
    ts.isTypeLiteralNode,
    dfs(sourceFile),
  )

  const members: [string, ts.Symbol][] = [
    ...(editorConstValue as any).symbol.members.entries()
  ]

  const name = checker.symbolToString((editorConstValue as any).symbol)

  const methods = members
    .map(([name, symbol]) => {
      const [firstSignature] = checker.getTypeOfSymbolAtLocation(
        symbol,
        symbol.valueDeclaration
      ).getCallSignatures()

      return {
        name,
        ...serializeSignature(firstSignature),
      }
    })

  const result = {
    name,
    methods,
  }

  console.log(JSON.stringify(result, undefined, 2))

  // const methodSignatureNodes = find(
  //   ts.isMethodSignature,
  //   dfs(sourceFile),
  // )

  // const toJson = createToJson(sourceFile)

  // for (const node of methodSignatureNodes) {
  //   console.log(JSON.stringify(toJson(node), undefined, 2))
  //   // for (const param of find(ts.isParameter, dfs(methodSignature))) {
  //   //   console.log(JSON.stringify(treeToJson(param), undefined, 2))
  //   // }
  // }
}