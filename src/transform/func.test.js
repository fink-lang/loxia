import {fink2js} from '../testing';


test('compiles func', ()=> {
  expect(
    fink2js(`
      fun1 = fn a, b=12, ...d: a + b + c

      fun2 = fn b:
        b * 2

      fun3 = fn: \`shrub\`
      fun4 = fn:
        \`shrub\`

      fun5 = fn c: fn d, e:
        match [d, e]:
          [1, 2]: c
          [2, 1]: 1/c

      fun6 = fn c, d:
        x = 123
        match ni:
          c + x: d
          c + 1: d + 1

      fun7 = fn a, b=12, c:
        shrub(...a)
        foo()
        bar()
    `)
  ).toMatchSnapshot();
});

