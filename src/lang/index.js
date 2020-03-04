import {ident, wrap} from '../js/types';
import {var_prefix} from '../js/identifier';

import {code_frame_err} from './errors';
import {get_transformer} from './context';

import {add_assignment} from './assignment';
import {add_func} from './func';
import {add_conditionals} from './conditionals';
import {add_iterables} from './iterable';
import {add_call} from './call';
import {add_literals} from './literals';
import {add_spread} from './spread';
import {add_async} from './async';
import {add_logical} from './logical';
import {add_group} from './group';
import {add_module} from './module';
import {add_member} from './prop-access';
import {add_ident} from './identifier';
import {add_comparison} from './comparison';
import {add_jsx} from './jsx';
import {add_js_compat} from './js-compat';
import {add_arithmitic} from './arithmitic';
import {add_generic} from './generic';


const add_transformers = (ctx)=> (
  ctx
    |> add_module
    |> add_ident
    |> add_literals
    |> add_group
    |> add_member
    |> add_logical
    |> add_comparison
    |> add_arithmitic
    |> add_assignment
    |> add_spread
    |> add_async
    |> add_func
    |> add_conditionals
    |> add_iterables
    |> add_call
    |> add_async
    |> add_jsx
    |> add_generic
    |> add_js_compat
);


const transform_expr = (node, ctx)=> {
  const transform = get_transformer(node.op, node.type, ctx);

  if (transform === undefined) {
    throw code_frame_err(new Error('Unknown expression'), node, ctx);
  }

  const transform_ctx = {
    ...ctx,
    transform: (nde)=> transform_expr(nde, transform_ctx)
  };

  try {
    const transformed_node = transform(node, transform_ctx);
    // TODO: some nodes have location data
    const wrapped = wrap(node, transformed_node);
    return wrapped;
  } catch (err) {
    throw code_frame_err(err, node, ctx);
  }
};


const init_ctx = (code, filename)=> {
  let id_ctr = 0;

  const ctx = {
    filename,
    code,
    unique_ident: (name)=> {
      id_ctr += 1;
      return ident(`${var_prefix}${name}_${id_ctr}`);
    }
  };

  return ctx
    |> add_transformers;
};


export const transform_ast = (node, code, filename)=> {
  const ctx = init_ctx(code, filename);
  const js_ast = transform_expr(node, ctx);
  return js_ast;
};


