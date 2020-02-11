import {fink2js} from '../testing';


test('compiles pipe', ()=> {
  expect(
    fink2js(`
      foo
        | bar
        | spam()
        | ni
    `)
  ).toMatchSnapshot();
});
