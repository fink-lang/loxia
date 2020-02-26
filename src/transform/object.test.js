import {fink2js} from '../testing';


test('object', ()=> {
  expect(
    fink2js(`
      obj1 = {}
      obj2 = {a}
      obj3 = {a, delete, true, false}
      obj4 = {a, b, ...c}
      obj5 = {a: 1, b: 123, \`c-d-e\`: cde }
      obj6 = {a=123, b: c=456}
      obj7 = {a: 123, b: 123 && 123 && 1345, c: fn a, b: 134}
      obj8 = {
        a: 123,
        b: 123
          && 123
          && 1345,
        c: fn a, b: 134,
        d:
          n = a+3
          foo(n)
      }

      {a, b, c}
    `)
  ).toMatchSnapshot();
});


test('destructuring object', ()=> {
  expect(
    fink2js(`
      {a, b, c} = ni
      {e, ...f} = {e: 0, foo: 12, bar: 34}
      {x=1, ni: {y, z}} = {ni: {y: 1, z: 2}}
      {\`n i\`: ni} = foo
    `)
  ).toMatchSnapshot();
});
