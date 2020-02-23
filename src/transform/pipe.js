import {call, assign, lets, expr_block, nul} from '../types';


export const transform_pipe = (node, {transform, unique_ident})=> {
  const {exprs} = node;
  const [start_value] = node.args;

  const result = unique_ident('pipe_result');

  return expr_block(
    // TODO: first should not be called with anything if
    // there is no start_value
    lets(result, start_value ? transform(start_value): nul()),
    ...exprs.map((expr)=> (
      assign(result, call(transform(expr))(result))
    ))
  );
};
