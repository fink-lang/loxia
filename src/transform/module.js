import {file, program} from '@babel/types';
import {block_statement} from './block';


export const transform_module = (node, ctx)=> (
  file(
    program(
      node.exprs
        .filter((expr)=> expr.type !== 'comment')
        .map(block_statement(ctx)),
      [], 'module'
    )
  )
);
