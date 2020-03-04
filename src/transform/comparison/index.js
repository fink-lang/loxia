import {add, any} from '../../context';
import {transform_binary} from '../generic/binary';


export const add_comparison = (ctx)=> (
  ctx
    |> add('comp', any, transform_binary)
);
