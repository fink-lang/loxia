import {add, any} from '../context';
import {transform_binary} from '../generic/binary';
import {transform_unary} from '../generic/unary';


export const add_arithmitic = (ctx)=> (
  ctx
    |> add('arithm', any, transform_binary)
    |> add('arithm_right', any, transform_binary)
    |> add('arithm_prefix', any, transform_unary)
);
