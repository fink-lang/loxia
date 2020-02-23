import {fink2js} from '../testing';


test('while', ()=> {
  expect(
    fink2js(`
      while item:
        item < 10
    `)
  ).toMatchSnapshot();
});
