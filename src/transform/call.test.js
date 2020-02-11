import {fink2js} from '../testing';


test('compiles call', ()=> {
  expect(
    fink2js(`
      call1 = a(ni, x=123, ...x)
      call2 = a(ni)
      call3 = a ()
      call4 = a((x): x*2)
    `)
  ).toMatchSnapshot();
});


