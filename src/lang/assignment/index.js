import {assignmentExpression} from '@babel/types';

import {add, any} from '../context';
import {transform_left} from '../generic/left';


export const transform_assign = (node, ctx)=> {
  const left = transform_left(ctx.transform(node.left));
  const right = ctx.transform(node.right);

  return assignmentExpression('=', left, right);
  // return wrap(node, assignmentExpression('=', left, right));
};


export const add_assignment = (ctx)=> (
  ctx
    |> add(any, '=', transform_assign)
);
