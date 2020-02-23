import {fink2js} from '../testing';


test('compiles pipe', ()=> {
  expect(
    fink2js(`
      pipe:
        foo
        bar
        spam

      pipe [1, 2, 3]:
        map item: item * 2
    `)
  ).toMatchSnapshot();
});
