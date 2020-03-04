import {fink2js} from '../../testing';


test('identifiers as infix operators', ()=> {
  expect(
    fink2js(`
      add = fn a, b: a + b
      foo = 123 add 456
    `)
  ).toMatchSnapshot();
});
