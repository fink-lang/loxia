import {templateElement, templateLiteral} from '@babel/types';


export const transform_string = (node)=> (
  templateLiteral(
    node.parts.map((part)=> templateElement({raw: part, cooked: part})),
    []
  )
);

