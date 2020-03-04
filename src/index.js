import babel_gen from '@babel/generator';
import traverse from '@babel/traverse';

import {transform_ast} from './lang';

import transform_do_expr from './js/do-expression';
import {transform_async} from './js/async';


const transform = (node, code, filename)=> {
  const ast = transform_ast(node, code, filename);

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

