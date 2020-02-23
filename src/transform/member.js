import {memberExpression} from '@babel/types';


export const transform_member = (node, ctx)=> {
  const left = ctx.transform(node.left);
  const right = ctx.transform(node.right);

  return memberExpression(left, right, node.right.type === 'string');
};
