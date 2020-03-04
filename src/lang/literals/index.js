import {any, add} from '../context';

import {transform_number} from './number';
import {transform_string} from './string';
import {transform_regex} from './regex';
import {transform_array} from './array';
import {transform_object, transform_prop} from './object';


export const add_literals = (ctx)=> (
  ctx
    |> add('number', any, transform_number)
    |> add('string', any, transform_string)
    |> add('regex', any, transform_regex)
    |> add('array', any, transform_array)
    |> add('object', any, transform_object)
    |> add('prop', any, transform_prop)
);
