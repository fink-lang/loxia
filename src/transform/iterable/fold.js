import {assign, params, for_of, split_last, func, consts, lets} from '../../types';
import {block_statement} from '../block';


export const transform_fold = (node, {transform, unique_ident})=> {
  const [item_param, acc_param] = node.args.map(transform);

  const [acc_decl, acc_initial] = [acc_param.left, acc_param.right];

  const [item] = params([item_param]);
  const items = unique_ident('items');
  const acc = unique_ident('acc');

  const [expressions, last_expr] = split_last(node.exprs);

  return func(items)(
    lets(acc, acc_initial),
    for_of(item, items)(
      consts(acc_decl, acc),
      ...expressions.map(block_statement({transform})),
      assign(acc, transform(last_expr))
    ),
    acc
  );
};

