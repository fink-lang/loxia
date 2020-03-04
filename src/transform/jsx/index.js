import {
  jsxElement, jsxOpeningElement, jsxIdentifier, jsxClosingElement, jsxAttribute,
  stringLiteral, jsxExpressionContainer, jsxText
} from '@babel/types';
import {add, any} from '../../context';


export const transform_jsx_elem = (node, {transform})=> {
  const id = jsxIdentifier(node.name);
  const attrs = node.props.map(transform);
  const children = node.children.map(transform);

  return jsxElement(
    jsxOpeningElement(id, attrs, node.self_closing),
    jsxClosingElement(id),
    children
  );
};


export const transform_jsx_attr = (node, {transform})=> {
  const id = jsxIdentifier(node.name);

  const value = node.value === null
    ? null
    : transform(node.value);

  return jsxAttribute(id, value);
};


export const transform_jsx_str = (node)=> (
  stringLiteral(node.value)
);


export const transform_jsx_text = (node)=> (
  jsxText(node.value)
);


export const transform_jsx_expr_container = (node, {transform})=> (
  jsxExpressionContainer(transform(node.expr))
);


export const add_jsx = (ctx)=> (
  ctx
    |> add('jsx-elem', any, transform_jsx_elem)
    |> add('jsx-attr', any, transform_jsx_attr)
    |> add('jsx-string', any, transform_jsx_str)
    |> add('jsx-text', any, transform_jsx_text)
    |> add('jsx-expr-container', any, transform_jsx_expr_container)
);
