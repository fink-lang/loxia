import {
  variableDeclaration, variableDeclarator, arrayPattern,
  objectPattern, assignmentPattern, forOfStatement, yieldExpression,
  expressionStatement, callExpression, functionExpression,
  blockStatement, identifier, arrowFunctionExpression,
  logicalExpression, binaryExpression, unaryExpression,
  stringLiteral, memberExpression, ifStatement, doExpression,
  assignmentExpression, returnStatement,
  isAssignmentExpression, isObjectExpression,
  isArrayExpression, isIdentifier
} from '@babel/types';

import {escape_ident} from './transform/other';


export const map = (mapper)=> ([...items])=> items.map(mapper);


export const get_comment = ({comment, loc})=> (
  comment
    ? {leadingComments: [{type: 'CommentBlock', value: comment.text, loc}]}
    : {}
);


export const wrap = (larix_node, js_node)=> (
  {...js_node, ...get_comment(larix_node), loc: larix_node.loc}
);


export const expr_block = (...expr)=> (
  doExpression(
    blockStatement(
      expr.map((node)=> {
        if (node.type.endsWith('Expression') || isIdentifier(node)) {
          return expressionStatement(node);
        }
        return node;
      })
    )
  )
);


export const member = (obj)=> (key, computed)=> (
  memberExpression(obj, key, computed)
);


export const str = (txt)=> stringLiteral(txt);


export const typof = (value)=> unaryExpression('typeof', value);


export const split_last = ([...items])=> (
  [items.slice(0, -1), items[items.length - 1]]
);


export const and = (left, ...rest)=> {
  if (rest.length) {
    return logicalExpression('&&', left, and(...rest));
  }
  return left;
};


export const neq = (left, right)=> binaryExpression('!==', left, right);


export const eq = (left, right)=> binaryExpression('===', left, right);


export const undef = ()=> identifier('undefined');


export const nul = ()=> identifier('null');

// eslint-disable-next-line no-underscore-dangle
export const true_ = ()=> identifier('true');

// export const false_ = ()=> identifier('false');

export const not_nullish = (value)=> and(
  neq(value, undef()),
  neq(value, nul())
);


export const ident = (name)=> (
  typeof name === 'string'
    ? identifier(escape_ident(name))
    : name
);


export const consts = (id, init)=> variableDeclaration(
  'const', [variableDeclarator(ident(id), init)]
);


export const lets = (id, init)=> variableDeclaration(
  'let', [variableDeclarator(ident(id), init)]
);


export const call = (callee)=> (...args)=> (
  callExpression(callee, args.map((arg)=> arg))
);


export const assign = (left, right)=> (
  expressionStatement(assignmentExpression('=', left, right))
);


export const yields = (expr, delegate)=> (
  expressionStatement(yieldExpression(expr, delegate))
);


export const iff = (test)=> (consequent)=> ifStatement(test, consequent);


export const returns = (expr)=> returnStatement(expr);


export const yield_or_stop = (expr, unique_ident, delegate)=> {
  const result = unique_ident('result');

  return [
    consts(result, expr),
    // iff(eq(result, ident('stop')))(
    //   returns()
    // ),
    // iff(neq(result, ident('skip')))(
    //   yields(result, delegate)
    // )
    yields(result, delegate)
  ];
};


export const func = (...args)=> (expr, ...expressions)=> (
  arrowFunctionExpression(
    args,
    expr_block(expr, ...expressions)
  )
);


export const generator = (name)=> (...args)=> (...statements)=> (
  functionExpression(
    ident(name),
    args,
    blockStatement(statements),
    true
  )
);


export const for_of = (item, items)=> (...expressions)=> (
  forOfStatement(
    consts(item), items,
    blockStatement(expressions)
  )
);


export const params = map((expr)=> {
  if (isAssignmentExpression(expr)) {
    return assignmentPattern(expr.left, expr.right);
  }

  if (isObjectExpression(expr)) {
    return objectPattern(params(expr.properties));
  }

  if (isArrayExpression(expr)) {
    return arrayPattern(params(expr.elements));
  }

  // TODO: was previously used.
  // if (isSpreadElement(expr)) {
  //   return restElement(expr.argument);
  // }

  return expr;
});

