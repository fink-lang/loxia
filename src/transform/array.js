import {arrayExpression} from '@babel/types';


export const transform_array = (node, ctx)=> {
  const elems = node.elems.map(ctx.transform);
  return arrayExpression(elems);
};
