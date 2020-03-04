import {add, any} from '../context';
import {code_frame_err} from '../errors';


export const transform_group = (node, {transform})=> (
  transform(node.exprs[0])

  // if (node.exprs.length === 1) {
  //   return transform(node.exprs[0]);
  // }

  // throw new Error('Expected only one expression.');
);


export const add_group = (ctx)=> (
  ctx
    |> add('group', any, transform_group)
);