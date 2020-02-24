import {memberExpression} from '@babel/types';


export const transform_member = (node, ctx)=> {
  const left = ctx.transform(node.left);
  const right = ctx.transform(node.right);

  const computed = (
    node.right.type === 'string'
    || node.right.type === 'group'
  );

  return memberExpression(left, right, computed);
};
