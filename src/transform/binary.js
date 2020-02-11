import {binaryExpression} from '@babel/types';


const transform_op = {
  '==': '===',
  '!=': '!==',
  '^': '**'
};


export const transform_binary = (node, ctx)=> {
  const left = ctx.transform(node.left);
  const right = ctx.transform(node.right);
  const op = transform_op[node.op] || node.op;
  return binaryExpression(op, left, right);
};
