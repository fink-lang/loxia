import {add, any} from '../../context';
import {transform_new} from './new';
import {transform_throw} from './throw';


export const add_js_compat = (ctx)=> (
  ctx
    |> add('new', any, transform_new)
    |> add('throw', any, transform_throw)
);
