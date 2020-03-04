import {arrayExpression} from '@babel/types';


export const transform_array = (node, ctx)=> {
  const elems = node.exprs.map((elem)=> (
    elem === null
      ? null
      : ctx.transform(elem)
  ));
  return arrayExpression(elems);
};
