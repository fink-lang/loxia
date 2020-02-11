import {
  isAssignmentExpression, assignmentPattern, isSpreadElement, restElement,
  isArrayExpression, arrayPattern, isObjectExpression, objectPattern
} from '@babel/types';


export const transform_left = (val)=> {
  if (isAssignmentExpression(val)) {
    return assignmentPattern(val.left, val.right);

  } else if (isSpreadElement(val)) {
    return restElement(val.argument);

  } else if (isArrayExpression(val)) {
    return arrayPattern(val.elements.map(transform_left));
  } else if (isObjectExpression(val)) {
    return objectPattern(val.properties.map(transform_left));
  }
  return val;
};
