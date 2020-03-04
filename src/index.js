import babel_gen from '@babel/generator';
import traverse from '@babel/traverse';

import {ident, expr_block, wrap} from './types';
import {code_frame_err} from './transform/errors';

import {add_assignment} from './transform/assignment';
import {add_func} from './transform/func';
import {add_conditionals} from './transform/conditionals';
import {add_iterables} from './transform/iterable';
import {add_call} from './transform/call';
import {add_literals} from './transform/literals';
import {add_spread} from './transform/spread';
import {add_async} from './transform/async';
import {add_logical} from './transform/logical';
import {transform_prop} from './transform/literals/object';
import {block_statement} from './transform/block';
import {add_group} from './transform/group';
import {add_module} from './transform/module';
import {add_member} from './transform/prop-access';
import {add_ident, var_prefix} from './transform/identifier';
import {add_comparison} from './transform/comparison';
import {add_jsx} from './transform/jsx';
import {add_js_compat} from './transform/js-compat';
import {add_arithmitic} from './transform/arithmitic';
import {add_generic} from './transform/generic';

import transform_do_expr from './transform/js/do-expression';
import {transform_async} from './transform/js/async';


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


// eslint-disable-next-line prefer-reflect
const obj_has = (obj, key)=> Object.prototype.hasOwnProperty.call(obj, key);


const get_transformer = (op, type, {transformers})=> {
  if (obj_has(transformers, op)) {
    return transformers[op];
  }

  if (obj_has(transformers, type)) {
    return transformers[type];
  }
};


const get_ctx = (transform, ctx)=> {
  const ctx_obj = {
    ...ctx,
    transform: (node)=> transform(node, ctx_obj)
  };

  return ctx_obj;
};


const transform_expr = (node, ctx)=> {
  const transform = get_transformer(node.op, node.type, ctx);

  if (transform === undefined) {
    throw code_frame_err(new Error('Unknown expression'), node, ctx);
  }

  try {
    const foo = transform(node, get_ctx(transform_expr, ctx));
    // TODO: some nodes have location data
    const wrapped = wrap(node, foo);
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


const transform = (node, code, filename)=> {
  const ctx = init_ctx(code, filename);
  const ast = transform_expr(node, ctx);

  traverse(ast, {
    DoExpression: transform_do_expr,
    AwaitExpression: {enter: transform_async}
  });

  return ast;
};


export const generate = (ast, filename, code)=> {
  const new_ast = transform(ast, code, filename);

  const options = {
    // retainLines: true,
    filename,
    sourceMaps: true,
    sourceFileName: filename
    // shouldPrintComment: ()=> true
  };

  const generated = babel_gen(new_ast, options, code);
  const final_code = generated.code;

  return {...generated, code: final_code, ast: new_ast};
};

