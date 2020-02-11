import {
  doExpression, blockStatement, nullLiteral, ifStatement, expressionStatement,
  isIfStatement
} from '@babel/types';


const split_condition = ({test, result})=> [test, result];


const conditionals = (transform, expr, ...rest)=> {
  const [test_expr, consequent_expr] = split_condition(expr);
  const test = transform(test_expr);
  const consequent = transform(consequent_expr);

  // TODO: in match test.value is used
  if (test.type === 'Identifier' && test.name === 'else') {
    return consequent;
  }

  const alternate = rest.length
    ? conditionals(transform, ...rest)
    : nullLiteral();

  return ifStatement(
    test,
    blockStatement([
      expressionStatement(consequent)
    ]),
    isIfStatement(alternate)
      ? alternate
      : blockStatement([
        expressionStatement(alternate)
      ])
  );
};


export const transform_cond = (node, {transform})=> {
  const {exprs} = node;

  return doExpression(
    blockStatement([
      conditionals(transform, ...exprs)
    ])
  );
};
