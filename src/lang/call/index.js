import {add, any} from '../context';
import {transform_call} from './call';
import {transform_pipe} from './pipe';


export const add_call = (ctx)=> (
  ctx
    |> add('call', any, transform_call)
    |> add(any, 'pipe', transform_pipe)
);
