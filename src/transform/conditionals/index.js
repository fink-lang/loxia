import {add, any} from '../../context';
import {transform_match} from './match';
import {transform_attempt} from './attempt';


export const add_conditionals = (ctx)=> (
  ctx
    |> add(any, 'match', transform_match)
    |> add(any, 'attempt', transform_attempt)
);
