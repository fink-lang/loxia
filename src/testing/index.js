import {parse} from '@fink/larix';
import {generate} from '..';


export const fink2js = (source)=> {
  const filename = 'test.fnk';
  const ast = parse(source, filename);
  const gen = generate(ast, filename, source);
  return gen.code;
};
