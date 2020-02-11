import {assignmentExpression} from '@babel/types';
import {transform_left} from './left';


export const transform_assign = (node, ctx)=> {
  const left = transform_left(ctx.transform(node.left));
  const right = ctx.transform(node.right);

  return assignmentExpression('=', left, right);
};
