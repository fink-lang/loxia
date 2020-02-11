import {logicalExpression} from '@babel/types';


export const transform_logical = (node, ctx)=> {
  const left = ctx.transform(node.left);
  const right = ctx.transform(node.right);
  return logicalExpression(node.op, left, right);
};
