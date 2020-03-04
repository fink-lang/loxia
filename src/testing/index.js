import {parse} from '@fink/larix';
import {generate} from '..';


export const unindent_text = (text)=> {
  const [, ...lines] = text.split(/\n/gm);
  const ind = lines[0].search(/[^ ]/);
  return lines.map((line)=> line.slice(ind)).join('\n');
};


export const fink2js = (source)=> {
  source = unindent_text(source);
  const filename = 'test.fnk';
  const ast = parse(source, filename);
  const gen = generate(ast, filename, source);
  return gen.code;
};
