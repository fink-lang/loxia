import {
  arrayPattern, blockStatement, breakStatement, labeledStatement, objectPattern,
  objectProperty, isObjectExpression, isArrayExpression, expressionStatement,
  identifier
} from '@babel/types';

import {
  member, str, for_of, split_last, and, eq, not_nullish, typof,
  expr_block, consts, iff
} from '../types';
import {is_call, is_calling} from './call';
import {is_array} from './array';


const iter = (value)=> (
  member(value)(member(identifier('Symbol'))(identifier('iterator')), true)
);


const is_iterable = (value)=> and(
  not_nullish(value),
  eq(
    typof(iter(value)), str('function')
  )
);


const simple_nested = (identifiers, use_val)=> ([simple, nested], item, idx)=> {
  const elem = use_val
    ? item.value
    : item;

  const id = identifiers[idx];

  const foo = {id, elem, item};

  if (isArrayExpression(elem) || isObjectExpression(elem)) {
    return [simple, [...nested, foo]];
  }
  return [[...simple, foo], nested];
};


const match_props = (value, props, emit_result, ctx)=> {
  const identifiers = props.map(()=> (
    ctx.unique_ident('p')
  ));
  const decl = objectPattern(
    props.map((prop, idx)=> objectProperty(prop.key, identifiers[idx]))
  );

  const [simple, nested] = props.reduce(
    simple_nested(identifiers, true), [[], []]
  );

  return blockStatement([
    consts(decl, value),
    iff(and(...simple.map(({elem, id})=> (
      eq(id, elem)
    ))))(
      nested.length === 0
        ? emit_result()
        : blockStatement(
          // eslint-disable-next-line no-use-before-define
          nested.map(({elem, id})=> match_condition(id, elem, emit_result, ctx))
        )
    )
  ]);
};


const match_obj = (value, expr, emit_result, ctx)=> (
  iff(not_nullish(value))(
    match_props(value, expr.properties, emit_result, ctx)
  )
);


const match_elems = (value, elems, emit_result, ctx)=> {
  const identifiers = elems.map(()=> ctx.unique_ident('a'));
  const decl = arrayPattern(identifiers);

  const [simple, nested] = elems.reduce(simple_nested(identifiers), [[], []]);

  return blockStatement([
    consts(decl, value),
    iff(and(...simple.map(({elem, id})=> eq(id, elem))))(
      nested.length === 0
        ? emit_result()
        : blockStatement(
          // eslint-disable-next-line no-use-before-define
          nested.map(({elem, id})=> match_condition(id, elem, emit_result, ctx))
        )
    )
  ]);
};


const match_array = (value, expr, emit_result, ctx)=> (
  iff(is_iterable(value))(
    match_elems(value, expr.elements, emit_result, ctx)
  )
);


const match_simple = (value, expr, emit_result)=> (
  {
    ...expr,
    ...iff(eq(value, expr))(
      emit_result()
    )
  }
);


const match_condition = (value, expr, emit_result, ctx)=> {
  if (isObjectExpression(expr)) {
    return match_obj(value, expr, emit_result, ctx);
  }

  if (isArrayExpression(expr)) {
    return match_array(value, expr, emit_result, ctx);
  }

  return match_simple(value, expr, emit_result);
};


const split_condition = ({test, result})=> [test, result];


function* match_all(value, matches, emit_result, ctx) {
  for (const expr of matches) {
    const [condition, result] = split_condition(expr);
    const test = ctx.transform(condition);

    if (condition.value === 'else') {
      yield emit_result(result);
      return;
    }

    yield match_condition(value, test, ()=> emit_result(result), ctx);
  }
}


export const transform_match = (node, ctx)=> {
  const {exprs} = node;
  const [inputs] = node.args;

  const value = ctx.unique_ident('value');
  const break_lbl = ctx.unique_ident('match');


  const emit_result = (result)=> blockStatement([
    expressionStatement(ctx.transform(result)),
    breakStatement(break_lbl)
  ]);

  return expr_block(
    labeledStatement(break_lbl,
      blockStatement([
        consts(value, ctx.transform(inputs)),
        ...match_all(value, exprs, emit_result, ctx)
      ])
    )
  );
};


