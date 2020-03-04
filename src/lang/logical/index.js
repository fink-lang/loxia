import {logicalExpression} from '@babel/types';
import {add, any} from '../context';
import {transform_unary} from '../generic/unary';


export const transform_logical = (node, ctx)=> {
  const left = ctx.transform(node.left);
  const right = ctx.transform(node.right);
  return logicalExpression(node.op, left, right);
};


export const add_logical = (ctx)=> (
  ctx
    |> add(any, '&&', transform_logical)
    |> add(any, '||', transform_logical)
    |> add(any, '!', transform_unary)
);
