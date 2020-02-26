import {generate} from '.';
import {unindent_text, fink2js} from './testing';


test('errors', ()=> {
  expect(
    ()=> fink2js(`
      123 = foo
    `)
  ).toThrow(unindent_text(`
    test.fnk:1:0: Unable to transform 'assign =':

    1| 123 = foo
       ^
    2|`)
  );

  expect(
    ()=> generate({
      type: 'test',
      op: null,
      loc: {
        start: {pos: 0, line: 1, column: 0},
        end: {pos: 9, line: 1, column: 9}
      }
    }, 'test.fnk', 'foobar')

  ).toThrow(unindent_text(`
    test.fnk:1:0: Unable to transform 'test':

    1| foobar
       ^
    `)
  );
});
