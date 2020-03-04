import {
  tryStatement, blockStatement, catchClause, arrayExpression,
  expressionStatement, doExpression, nullLiteral, isDoExpression
} from '@babel/types';

import {split_last} from '../../types';
import {transform_block} from '../block';


export const transform_attempt = (node, ctx)=> {
  const block = transform_block(node, ctx);
  const body = isDoExpression(block)
    ? block.body.body
    : [block];

  const [expressions, last_expr] = split_last(body);
  const err = ctx.unique_ident('error');

  return doExpression(
    blockStatement([
      tryStatement(
        blockStatement([
          ...expressions,
          expressionStatement(
            arrayExpression([nullLiteral(), last_expr.expression || last_expr])
          )
        ]),
        catchClause(
          err,
          blockStatement([
            expressionStatement(
              arrayExpression([err, nullLiteral()])
            )
          ])
        )
      )
    ])
  );
};
