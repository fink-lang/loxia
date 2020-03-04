import {add, any} from '../../context';
import {transform_inifx} from './infix';
import {transform_block} from '../block';


export const add_generic = (ctx)=> (
  ctx
    |> add('infix', any, transform_inifx)
    |> add('block', any, transform_block)
);
