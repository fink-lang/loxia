import {spreadElement} from '@babel/types';


export const transform_spread = (node, ctx)=> {
  const right = ctx.transform(node.right);
  return spreadElement(right);
};


