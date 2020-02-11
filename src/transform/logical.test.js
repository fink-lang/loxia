import {fink2js} from '../testing';


test('compiles logical', ()=> {
  expect(
    fink2js(`
      logical = a || b || c && d < 1 <= s
    `)
  ).toMatchSnapshot();
});


