import * as ts from 'typescript';

interface NodeJSON {
  comment;
  kind;
  name?;
  type;
  nodes: NodeJSON[];
}

export function getChildNodes(
  node: ts.Node,
): ts.Node[] {
  const children: ts.Node[] = []

  ts.forEachChild(node, child => {
    children.push(child)
  })

  return children
}

export function createDepthFirstTraverse<T>(
  getChildren: (node: T) => Iterable<T>
) {
  return function* depthFirstTraverse(
    node: T,
  ): IterableIterator<T> {
    yield node

    for (const child of getChildren(node)) {
      yield* depthFirstTraverse(child)
    }
  }
}

export function createToJson(
  sourceFile: ts.SourceFile,
) {
  return function toJson(
    node: ts.Node,
  ): NodeJSON {
    let comment: string
    let name: string
    let kind: string = ts.SyntaxKind[node.kind]
    let type: string

    switch (node.kind) {
      case ts.SyntaxKind.AnyKeyword:
        break;
      case ts.SyntaxKind.ArrayType:
        break;
      case ts.SyntaxKind.BooleanKeyword:
        break;
      case ts.SyntaxKind.DeclareKeyword:
        break;
      case ts.SyntaxKind.EndOfFileToken:
        break;
      case ts.SyntaxKind.ExportKeyword:
        break;
      case ts.SyntaxKind.FirstStatement:
        break;
      case ts.SyntaxKind.FirstTypeNode:
        break;
      case ts.SyntaxKind.FunctionType:
        break;
      case ts.SyntaxKind.Identifier:
        name = (node as ts.Identifier).text;
        break;
      case ts.SyntaxKind.ImportClause:
        break;
      case ts.SyntaxKind.ImportDeclaration:
        break;
      case ts.SyntaxKind.ImportSpecifier:
        break;
      case ts.SyntaxKind.IndexSignature:
        break;
      case ts.SyntaxKind.InterfaceDeclaration:
        break;
      case ts.SyntaxKind.LiteralType:
        break;
      case ts.SyntaxKind.MethodSignature:
        comment = (node as any).jsDoc[0].comment
        name = (node as ts.MethodSignature).name.getText(sourceFile)
        break;
      case ts.SyntaxKind.NamedImports:
        break;
      case ts.SyntaxKind.NullKeyword:
        break;
      case ts.SyntaxKind.NumberKeyword:
        break;
      case ts.SyntaxKind.Parameter:
        name = (node as ts.ParameterDeclaration).name.getText(sourceFile)
        type = (node as ts.ParameterDeclaration).type.getText(sourceFile)
        break;
      case ts.SyntaxKind.ParenthesizedType:
        break;
      case ts.SyntaxKind.PropertySignature:
        break;
      case ts.SyntaxKind.QuestionToken:
        break;
      case ts.SyntaxKind.SourceFile:
        break;
      case ts.SyntaxKind.StringKeyword:
        break;
      case ts.SyntaxKind.StringLiteral:
        break;
      case ts.SyntaxKind.TupleType:
        break;
      case ts.SyntaxKind.TypeLiteral:
        break;
      case ts.SyntaxKind.TypeParameter:
        break;
      case ts.SyntaxKind.TypeReference:
        break;
      case ts.SyntaxKind.UndefinedKeyword:
        break;
      case ts.SyntaxKind.UnionType:
        break;
      case ts.SyntaxKind.VariableDeclaration:
        name = (node as ts.VariableDeclaration).name.getText(sourceFile)
        break;
      case ts.SyntaxKind.VariableDeclarationList:
        break;
      case ts.SyntaxKind.VoidKeyword:
        break;
    }

    // child nodes
    const nodes: NodeJSON[] = []
    ts.forEachChild(node, child => {
      nodes.push(toJson(child))
    })

    return name
      ? { kind, name, type, comment, nodes }
      : { kind, type, comment, nodes }
  }
}

export function createTreeTransform<T, U>(
  getChildren: (t: T) => T[],
  transform: (t: T, children: T[]) => U,
) {
  return function transformTree(
    node: T,
  ): U {
    return transform(node, getChildren(node))
  }
}

export function* find<T, U extends T>(
  predicate: (item: T) => item is U,
  iterable: Iterable<T>,
): IterableIterator<U> {
  for (const item of iterable) {
    if (predicate(item)) {
      yield item
    }
  }
}

export function createSerializeSignature(
  checker: ts.TypeChecker,
) {
  const serializeSymbol = createSerializeSymbol(checker)

  return function serializeSignature(
    signature: ts.Signature
  ) {
    const x = signature.getReturnType()
    return {
      args: signature.parameters.map(serializeSymbol),
      returnType: checker.typeToString(signature.getReturnType()),
      documentation: ts.displayPartsToString(signature.getDocumentationComment(checker))
    }
  }
}

export function createSerializeSymbol(
  checker: ts.TypeChecker,
) {
  return function serializeSymbol(
    symbol: ts.Symbol
  ) {
    const name = symbol.getName()
    const documentation = ts.displayPartsToString(symbol.getDocumentationComment(checker))
    const isOptional = !!checker.symbolToParameterDeclaration(symbol).questionToken
    const type = checker.typeToString(
      checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!)
    )

    return {
      name,
      documentation,
      isOptional,
      type,
    }
  }
}