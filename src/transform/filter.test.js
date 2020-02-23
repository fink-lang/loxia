import {fink2js} from '../testing';


test('filter', ()=> {
  expect(
    fink2js(`
      filter item:
        item % 2 == 0
    `)
  ).toMatchSnapshot();
});
