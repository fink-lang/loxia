import {
  file, program, objectExpression, objectProperty, identifier,
  expressionStatement
} from '@babel/types';
import {other_token} from '@fink/prattler/symbols';

import {block_statement} from './block';
import {call, member, ident} from '../types';


export const transform_module = (node, ctx)=> {
  const exported = [];

  const body = node.exprs
    .filter((expr)=> expr.type !== 'comment')
    .map((expr)=> {
      const result = block_statement(ctx)(expr);

      if (expr?.left?.type === other_token) {
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
