import {callExpression} from '@babel/types';


export const transform_call = (node, ctx)=> {
  const callee = ctx.transform(node.callee);
  const args = node.args.map(ctx.transform);
  return callExpression(callee, args);
};
