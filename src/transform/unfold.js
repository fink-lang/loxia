import {
  assign, generator, for_of, split_last, ident, call, yield_or_stop, params
} from '../types';
import {whileStatement, blockStatement} from '@babel/types';
import {block_statement} from './block';
import {transform_left} from './left';


const loop = (...body)=> (
  whileStatement(ident('true'), blockStatement(body))
);


const get_acc = (inputs)=> {
  const [acc_init] = params(inputs);
  const acc_id = acc_init.left;
  return [acc_id, [acc_init]];
};


export const transform_unfold = (node, {transform, unique_ident})=> {
  const [acc_id, acc_init] = get_acc(
    node.args.map((arg)=> transform_left(transform(arg)))
  );

  const [expressions, last_expr] = split_last(node.exprs);

  const [result, next_value] = last_expr.type === 'group'
    ? last_expr.exprs
    : [last_expr, false];

  const gen = generator('unfold')(...acc_init)(
    loop(
      ...expressions.map(block_statement({transform})),
      ...yield_or_stop(transform(result), unique_ident),
      ...(next_value ? [assign(acc_id, transform(next_value))] : [])
    )
  );

  return call(gen)();
};
