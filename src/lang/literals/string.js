import {
  templateElement, templateLiteral, taggedTemplateExpression
} from '@babel/types';


export const transform_string = (node, {transform})=> {
  const quasies = node.parts
    .filter((part, idx)=> idx % 2 === 0)
    .map((part)=> templateElement({
      raw: part.value.replace(/\\([\s\S])|(`)/g, '\\$1$2')
    }));

  const expressions = node.parts
    .filter((part, idx)=> idx % 2 === 1)
    .map((part)=> transform(part));

  const templ_str = templateLiteral(quasies, expressions);

  if (node.tag) {
    return taggedTemplateExpression(transform(node.tag), templ_str);
  }

  return templ_str;
};

