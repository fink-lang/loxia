import {spreadElement} from '@babel/types';
import {add, any} from '../context';


export const transform_spread = (node, ctx)=> {
  const right = ctx.transform(node.right);
  return spreadElement(right);
};


export const add_spread = (ctx)=> (
  ctx
    |> add(any, '...', transform_spread)
);
