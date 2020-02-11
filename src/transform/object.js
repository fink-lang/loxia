import {isSpreadElement, objectExpression, objectProperty} from '@babel/types';


export const transform_object = (node, ctx)=> {
  const props = node.props.map(ctx.transform);
  return objectExpression(props);
};


export const transform_prop = (node, ctx)=> {
  const computed = false;
  const shorthand = node.key === node.value;

  const key = ctx.transform(node.key);
  if (isSpreadElement(key)) {
    return key;
  }

  const value = ctx.transform(node.value);
  return objectProperty(key, value, computed, shorthand);
};

