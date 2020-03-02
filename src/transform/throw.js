import {unaryExpression} from '@babel/types';
import {wrap} from '../types';


export const transform_throw = (node, ctx)=> {
  const right = ctx.transform(node.right);

  return wrap(node, unaryExpression('throw', right));
};

