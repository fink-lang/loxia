import babel_gen from '@babel/generator';
import traverse from '@babel/traverse';

import {ident, expr_block, wrap} from './types';
import {code_frame_err} from './errors';

import {transform_assign} from './transform/assign';
import {transform_func} from './transform/func';
import {transform_attempt} from './transform/attempt';
import {transform_match} from './transform/match';
import {transform_map} from './transform/map';
import {transform_flat_map} from './transform/map';
import {transform_filter} from './transform/filter';
import {transform_while} from './transform/while';
import {transform_fold} from './transform/fold';
import {transform_unfold} from './transform/unfold';
import {transform_call} from './transform/call';
import {transform_pipe} from './transform/pipe';
import {transform_binary} from './transform/binary';
import {transform_array} from './transform/array';
import {transform_spread} from './transform/spread';
import {transform_await} from './transform/await';
import {transform_string} from './transform/string';
import {transform_regex} from './transform/regex';
import {transform_logical} from './transform/logical';
import {transform_object, transform_prop} from './transform/object';
import {transform_block, block_statement} from './transform/block';
import {transform_group} from './transform/group';
import {transform_module} from './transform/module';
import {transform_unary} from './transform/unary';
import {transform_member} from './transform/member';
import {transform_inifx} from './transform/infix';
import {transform_import} from './transform/import';
import {transform_ident, escape_ident, var_prefix} from './transform/other';
import {transform_number} from './transform/number';

import {
  transform_jsx_elem, transform_jsx_attr, transform_jsx_str,
  transform_jsx_expr_container, transform_jsx_text
} from './transform/jsx';

import transform_do_expr from './transform/js/do-expression';
import {transform_async} from './transform/js/async';
import {transform_new} from './transform/new';
import {transform_throw} from './transform/throw';


const jsx = {
  'jsx-elem': transform_jsx_elem,
  'jsx-attr': transform_jsx_attr,
  'jsx-string': transform_jsx_str,
  'jsx-text': transform_jsx_text,
  'jsx-expr-container': transform_jsx_expr_container
};

const literals = {
  ident: transform_ident,
  number: transform_number,

  string: transform_string,
  regex: transform_regex,

  group: transform_group,

  array: transform_array,

  object: transform_object,
  prop: transform_prop
};

const unary_ops = {
  arithm_prefix: transform_unary,
  await: transform_await,
  '...': transform_spread,
  '!': transform_unary,
  new: transform_new,
  throw: transform_throw,
  import: transform_import
};

const binary_ops = {
  arithm: transform_binary,
  arithm_right: transform_binary,

  comp: transform_binary,

  '=': transform_assign,

  '&&': transform_logical,
  '||': transform_logical,

  '.': transform_member,

  call: transform_call,
  infix: transform_inifx
};

const block_like = {
  block: transform_block,
  fn: transform_func,
  module: transform_module
};

const control_flow = {
  match: transform_match,
  attempt: transform_attempt,
  pipe: transform_pipe
};

const iterables = {
  fold: transform_fold,
  unfold: transform_unfold,
  map: transform_map,
  flat_map: transform_flat_map,
  filter: transform_filter,
  while: transform_while
};


const transformers = {
  ...literals,
  ...unary_ops,
  ...binary_ops,
  ...block_like,
  ...control_flow,
  ...iterables,
  ...jsx
};


const get_ctx = (transform, ctx)=> {
  const ctx_obj = {
    ...ctx,
    transform: (node)=> transform(node, ctx_obj)
  };

  return ctx_obj;
};


// eslint-disable-next-line prefer-reflect
const obj_has = (obj, key)=> Object.prototype.hasOwnProperty.call(obj, key);


const get_transformer = (op, type)=> {
  if (obj_has(transformers, op)) {
    return transformers[op];
  }

  if (obj_has(transformers, type)) {
    return transformers[type];
  }
};


const transform_expr = (node, ctx)=> {
  const transform = get_transformer(node.op, node.type);

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


const transform = (node, code, filename)=> {
  let id_ctr = 0;
  const ast = transform_expr(node, {
    filename,
    code,
    unique_ident: (name)=> {
      id_ctr += 1;
      return ident(`${var_prefix}${name}_${id_ctr}`);
    }
  });

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

