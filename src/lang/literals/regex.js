import {regExpLiteral} from '@babel/types';


export const transform_regex = (node)=> {
  const pattern = node.pattern.replace(/(#.*\n)|[\n\s]/gm, '');
  return regExpLiteral(pattern, node.flags);
};
