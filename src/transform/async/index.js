import {awaitExpression} from '@babel/types';
import {add, any} from '../../context';


export const transform_await = (node, ctx)=> {
  const right = ctx.transform(node.right);
  return awaitExpression(right);
};


export const add_async = (ctx)=> (
  ctx
    |> add('await', any, transform_await)
);
