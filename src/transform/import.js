import {identifier} from '@babel/types';
import {call} from '../types';


export const transform_import = (node, ctx)=> {
  const right = ctx.transform(node.right);
  return call(identifier('require'))(right);
};

