import {arrowFunctionExpression} from '@babel/types';

import {transform_left} from './left';
import {transform_block} from './block';


export const transform_func = (node, ctx)=> {
  const params = node.args.map((arg)=> transform_left(ctx.transform(arg)));
  const body = transform_block(node, ctx);
  return arrowFunctionExpression(params, body);
};

