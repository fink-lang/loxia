import {call} from '../types';


export const transform_pipe = (node, {transform})=> (
  call(transform(node.right))(transform(node.left))
);
