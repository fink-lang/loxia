import {awaitExpression} from '@babel/types';


export const transform_await = (node, ctx)=> {
  const right = ctx.transform(node.right);
  return awaitExpression(right);
};

