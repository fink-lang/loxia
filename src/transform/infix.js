import {call, ident} from '../types';


export const transform_inifx = (node, ctx)=> {
  const left = ctx.transform(node.left);
  const right = ctx.transform(node.right);
  return call(ident(node.op))(left, right);
};
