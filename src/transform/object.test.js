import {fink2js} from '../testing';


test('compiles object', ()=> {
  expect(
    fink2js(`
      obj1 = {}
      obj2 = {a}
      obj3 = {a, b}
      obj4 = {a, b, ...c}
      obj5 = {a: 1, b: 123}
      obj6 = {a: 123, b: 123 && 123 && 1345, c: (a, b): 134}
      obj7 = {
        a: 123,
        b: 123
          && 123
          && 1345,
        c: (a, b): 134
      }
    `)
  ).toMatchSnapshot();
});
