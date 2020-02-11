import {assignmentExpression, returnStatement} from '@babel/types';
import {lets, assign, undef} from '../../types';


// eslint-disable-next-line
function* last_expressions(path) {
  if (path.isDoExpression()) {
    const body = path.get('body');
    yield * last_expressions(body);

  } else if (path.isBlockStatement()) {
    const body = path.get('body');
    const last = body[body.length - 1];
    if (last.isExpressionStatement()) {
      yield last;
    } else {
      yield * last_expressions(last);
    }
  } else if (path.isLabeledStatement()) {
    const items = [];
    path.traverse({
      BreakStatement: (brk)=> {
        const last = brk.getSibling(brk.key - 1);
        items.push(last);
      }
    });
    yield * items;
  } else if (path.isIfStatement()) {
    yield * last_expressions(path.get('consequent'));
    yield * last_expressions(path.get('alternate'));

  } else /* istanbul ignore else */ if (path.isTryStatement()) {
    yield * last_expressions(path.get('block'));
    yield * last_expressions(path.get('handler').get('body'));

  } else {
    throw path.buildCodeFrameError(`Can't convert do-expression`);
  }
}


const replace_with_return = (path)=> {
  for (const expr of last_expressions(path)) {
    expr.replaceWith(
      returnStatement(expr.node.expression)
    );

    // TODO: no need for anything after return
    // const sibl = expr.getSibling(expr.key+1);
    // if (sibl) {
    //   sibl.remove();
    // }
  }
};

const simple = (body /* , sl=false */)=> {
  if (body.isBlockStatement()) {
    const [stmnt, ...rest] = body.get('body');

    if (rest.length === 0) {
      // TODO: these were here in early prototypes, check what they did
      // if (sl && stmnt.isLabeledStatement()) {
      //   return stmnt.node.body;
      // }
      // // TODO: last if statement or single in arrow
      // if (sl && stmnt.isIfStatement()) {
      //   return body.node;
      // }

      return simple(stmnt);
    }
  }

  return body.node;
};

const replace_with_assign = (target, path)=> {
  const id = path.parentPath.scope.generateUidIdentifier('do_result');
  target.node.init = id;

  target.parentPath.insertBefore(lets(id));
  target.parentPath.insertBefore(simple(path.get('body')));
  target.parentPath.insertAfter(assign(id, undef()));

  for (const expr of last_expressions(path)) {
    expr.replaceWith(
      assignmentExpression('=', id, expr.node.expression)
    );
  }
};


const transform_do_expr = (path)=> {
  const {parentPath: parent} = path;

  if (parent.isVariableDeclarator()) {
    replace_with_assign(parent, path);

  } else /* istanbul ignore else */ if (parent.isArrowFunctionExpression()) {
    // console.log(dbg(parent.node));
    parent.node.body = simple(path.get('body'), true);
    replace_with_return(path);

  } else {
    throw parent.buildCodeFrameError(`Can't convert do-expression`);
  }

  // else if (parent.isExpressionStatement()) {
  //   parent.replaceWith(path.get('body').node);

  // } else if (parent.isReturnStatement()) {
  //   parent.replaceWith(simple(path.get('body'), true));
  //   replace_with_return(path);

  // } else if (parent.type === null) {
  //   // console.log('==============================');

  // } else if (!parent.isProgram()) {
  //   path.replaceWith(
  //     callExpression(arrowFunctionExpression([], path.node), [])
  //   );
  //   // parent.insertBefore(expressionStatement(identifier('ret_st')));
  //   // throw parent.buildCodeFrameError(`Can't convert do-expression`);
  // }
};

export default transform_do_expr;


