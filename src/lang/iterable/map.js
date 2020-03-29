import {
  params, generator, for_of, yield_or_stop, split_last
} from '../../js/types';
import {is_call, is_calling} from '../call/call';
import {block_statement} from '../block';


export const transform_any = (flatten)=> (node, {transform, unique_ident})=> {
  const [item_param] = node.args.map(transform);

  const [item] = params([item_param]);
  const [expressions, last_expr] = split_last(node.exprs);

  const last_is_spread = (last_expr.type === 'spread');

  const yield_value = (
    last_is_spread
      ? last_expr.right
      : last_expr
  );

  const items = unique_ident('items');

  return generator('map')(items)(
    for_of(item, items)(
      ...expressions.map(block_statement({transform})),
      ...yield_or_stop(
        transform(yield_value),
        unique_ident, flatten || last_is_spread
      )
    )
  );
};


export const transform_map = transform_any(false);


export const transform_flat_map = transform_any(true);
