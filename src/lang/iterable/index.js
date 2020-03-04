import {add, any} from '../context';
import {transform_fold} from './fold';
import {transform_unfold} from './unfold';
import {transform_map, transform_flat_map} from './map';
import {transform_filter} from './filter';
import {transform_while} from './while';
import {transform_find} from './find';


export const add_iterables = (ctx)=> (
  ctx
    |> add(any, 'fold', transform_fold)
    |> add(any, 'unfold', transform_unfold)
    |> add(any, 'map', transform_map)
    |> add(any, 'flat_map', transform_flat_map)
    |> add(any, 'filter', transform_filter)
    |> add(any, 'while', transform_while)
    |> add(any, 'find', transform_find)
);
