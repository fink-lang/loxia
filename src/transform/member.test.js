import {fink2js} from '../testing';


test('compiles member', ()=> {
  expect(
    fink2js(`
      foo = spam.shrub
      computed_member = item.(bar + 123)
    `)
  ).toMatchSnapshot();
});
