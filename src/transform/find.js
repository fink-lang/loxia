import {
  params, for_of, split_last, func, returns, iff, consts, undef
} from '../types';
import {block_statement} from './block';


export const transform_find = (node, {transform, unique_ident})=> {
  const [item_param] = node.args.map(transform);
  const [init] = params([item_param]);

  const item = unique_ident('item');
  const items = unique_ident('items');
  const found = unique_ident('found');

  const [expressions, last_expr] = split_last(node.exprs);

  return func(items)(

    for_of(item, items)(
      consts(init, item),

      ...expressions.map(block_statement({transform})),

      consts(found, transform(last_expr)),

      iff(found)(
        returns(item)
      )
    ),

    undef()
  );
};

