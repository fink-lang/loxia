import {
  isSpreadElement, objectExpression, objectProperty, stringLiteral
} from '@babel/types';


export const transform_object = (node, ctx)=> {
  const props = node.props.map(ctx.transform);
  return objectExpression(props);
};


export const transform_prop = (node, ctx)=> {
  const is_str_key = node.key.type === 'string';
  const computed = is_str_key;
  const shorthand = node.key === node.value;


  const key = (is_str_key || node.key.type === 'spread')
    ? ctx.transform(node.key)
    : {...stringLiteral(node.key.value), loc: node.key.loc};

  if (isSpreadElement(key)) {
    return key;
  }

  const value = ctx.transform(node.value);
  return objectProperty(key, value, computed, shorthand);
};

