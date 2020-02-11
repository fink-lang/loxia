import {fink2js} from '../testing';


test('compiles func', ()=> {
  expect(
    fink2js(`
      fun1 = (a, b=12, ...d): a + b + c

      fun2 = (b):
        b * 2

      fun3 = (): \`shrub\`
      fun4 = ():
        \`shrub\`

      fun5 = (c): (d, e):
        a + b + c

      fun6 = (a, b=12, c):
        shrub(...a)
        foo()
        bar()
    `)
  ).toMatchSnapshot();
});


