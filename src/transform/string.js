import {templateElement, templateLiteral, taggedTemplateExpression} from '@babel/types';


export const transform_string = (node, {transform})=> {
  const templ_str = templateLiteral(
    node.parts.map((part)=> templateElement({raw: part, cooked: part})),
    []
  );

  if (node.tag) {

    return taggedTemplateExpression(transform(node.tag), templ_str);
  }

  return templ_str;
};

