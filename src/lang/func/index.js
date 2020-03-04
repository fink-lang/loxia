import {arrowFunctionExpression} from '@babel/types';

import {add, any} from '../context';
import {transform_left} from '../generic/left';
import {transform_block} from '../block';


export const transform_func = (node, ctx)=> {
  const params = node.args.map((arg)=> transform_left(ctx.transform(arg)));
  const body = transform_block(node, ctx);
  return arrowFunctionExpression(params, body);
};


export const add_func = (ctx)=> (
  ctx
    |> add(any, 'fn', transform_func)
);
