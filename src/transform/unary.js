import {unaryExpression} from '@babel/types';


export const transform_unary= (node, ctx)=> {
  const right = ctx.transform(node.right);
  return unaryExpression(node.op, right);
};
