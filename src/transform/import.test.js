import {fink2js} from '../testing';


test('compiles attempt', ()=> {
  expect(
    fink2js(`
      {foo} = import \`./spam\`
    `)
  ).toMatchSnapshot();
});


