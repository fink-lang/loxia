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


const get_key = ({key}, ctx)=> {
  if (key.type === 'group' || key.type === 'string') {
    return [ctx.transform(key), true];
  }

  return [str_key(key), false];
};


export const transform_prop = (node, ctx)=> {
  if (node.key.type === 'spread') {
    return ctx.transform(node.key);
  }

  const [key, computed] = get_key(node, ctx);
  const value = ctx.transform(node.value);

  const shorthand = (node.key === node.value);
  const is_default_assignment = node.value.type === 'assign';

  return objectProperty(
    key,
    is_default_assignment
      ? assignmentPattern(value.left, value.right)
      : value,
    computed, shorthand
  );
};

