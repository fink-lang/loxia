import {
  objectExpression, objectProperty, stringLiteral, assignmentPattern
} from '@babel/types';


export const transform_object = (node, ctx)=> {
  const props = node.exprs.map(ctx.transform);
  return objectExpression(props);
};


const str_key = ({value, loc})=> (
  {...stringLiteral(value), loc}
);


export const transform_prop = (node, ctx)=> {
  if (node.key.type === 'spread') {
    return ctx.transform(node.key);
  }

  const is_str_key = node.key.type === 'string';
  const is_default_assignment = node.value.type === 'assign';

  const key = (
    is_str_key
      ? ctx.transform(node.key)
      : str_key(node.key)
  );

  const value = ctx.transform(node.value);

  const computed = is_str_key;
  const shorthand = (node.key === node.value);

  return objectProperty(
    key,
    is_default_assignment
      ? assignmentPattern(value.left, value.right)
      : value,
    computed, shorthand
  );
};

