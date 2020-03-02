import {newExpression} from '@babel/types';
import {wrap} from '../types';


export const transform_new = (node, ctx)=> {
  const right = ctx.transform(node.right);

  return wrap(node, newExpression(right.callee, right.arguments));
};

