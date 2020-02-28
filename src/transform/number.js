import {numericLiteral, bigIntLiteral} from '@babel/types';


export const transform_number = ({value})=> (
  value.match(/\./)
    ? numericLiteral(Number(value))
    :bigIntLiteral(value)
);
