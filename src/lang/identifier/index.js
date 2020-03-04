import {identifier} from '@babel/types';

import {escape_ident} from '../../js/identifier';
import {add, any} from '../context';


export const transform_ident = ({value})=> {
  const name = escape_ident(value);
  return identifier(name);
};


export const add_ident = (ctx)=> (
  ctx
    |> add('ident', any, transform_ident)
);
