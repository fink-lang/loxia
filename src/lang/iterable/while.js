import {
  params, generator, for_of, yield_or_stop, split_last, iff, yields, consts,
  returns, neq, true_
} from '../../js/types';
import {is_call, is_calling} from '../call/call';
import {block_statement} from '../block';


export const transform_while = (node, {transform, unique_ident})=> {
  const [item_param] = params(node.args.map(transform));

  const [expressions, last_expr] = split_last(node.exprs);

  const item = unique_ident('item');
  const items = unique_ident('items');
  const result = unique_ident('result');

  return generator('filter_while')(items)(
    for_of(item, items)(
      consts(item_param, item),
      ...expressions.map(block_statement({transform})),
      consts(result, transform(last_expr)),
      iff(neq(result, true_()))(
        returns()
      ),
      yields(item)
    )
  );
};
