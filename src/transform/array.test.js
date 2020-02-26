import {fink2js} from '../testing';


test('array', ()=> {
  expect(
    fink2js(`
      array1 = []
      array2 = [1]
      array3 = [1, 2, 4, a(), ...b]
      array4 = [
        a + 1 + 45+
          b + c,
        [1, 2],
        (3 + 3) * 2
      ]
    `)
  ).toMatchSnapshot();
});


test('destructuring array', ()=> {
  expect(
    fink2js(`
      [a, b, c] = ni
      [,, d] = ni
      [e, ...f] = ni
    `)
  ).toMatchSnapshot();
});


