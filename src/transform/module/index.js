import {
  file, program, objectExpression, objectProperty, identifier,
  expressionStatement
} from '@babel/types';

import {call, member, ident} from '../../types';
import {add, any} from '../../context';

import {block_statement} from '../block';
import {transform_import} from './import';


export const transform_module = (node, ctx)=> {
  const exported = [];

  const body = node.exprs
    .filter((expr)=> expr.type !== 'comment')
    .map((expr)=> {
      const result = block_statement(ctx)(expr);

      if (expr?.left?.type === 'ident') {
        // TODO: wrap with loc?
        const id = ident(expr.left.value);

        exported.push(objectProperty(
          id, id, false, true
        ));
      }
      return result;
    });

  // TODO: auto export?
  const exports = expressionStatement(
    call(member(identifier('Object'))(identifier('assign')))(
      member(identifier('module'))(identifier('exports')),
      objectExpression(exported)
    )
  );
  return file(program([...body, exports], [], 'module'));
};


export const add_module = (ctx)=> (
  ctx
    |> add('module', any, transform_module)
    |> add('import', any, transform_import)
);
