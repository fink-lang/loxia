import {code_frame_err} from '../errors';


export const transform_group = (node, ctx)=> (
  ctx.transform(node.exprs[0])
  // TODO: if (node.exprs.length === 1) {
  //   return ctx.transform(node.exprs[0]);
  // }
  // throw code_frame_err('Expected only one expression.', node);
);
