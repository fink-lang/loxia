import {fink2js} from '../testing';


test('compiles attempt', ()=> {
  expect(
    fink2js(`
      foo1 = ():
        [item, err] = attempt:
          bar = shrub()
          bar + ni()
        [item, err]

      foo2 = (): attempt: 1/0
    `)
  ).toMatchSnapshot();
});


