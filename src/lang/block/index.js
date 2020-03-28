import {
  doExpression, blockStatement, isAssignmentExpression,
  expressionStatement, variableDeclaration, variableDeclarator
} from '@babel/types';


export const block_statement = ({transform})=> (expr)=> {
  const st = transform(expr);

  if (isAssignmentExpression(st)) {
    const decl = variableDeclaration(
      'const', [variableDeclarator(st.left, st.right)]
    );
    decl.leadingComments = st.leadingComments;
    return decl;
  }

  // TODO: check if (isExpression(st)) ...
  return expressionStatement(st);
};


export const transform_block = (node, ctx)=> {
  const {exprs} = node;

  if (exprs.length === 1) {
    const [expr] = exprs;
    return ctx.transform(expr);
  }

  return doExpression(
    blockStatement(
      exprs.map(block_statement(ctx))
    )
  );
};
