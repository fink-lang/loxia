import {fink2js} from '../testing';


test('compiles left hand sides', ()=> {
  expect(
    fink2js(`
      [a1, b1] = \`ab\`
      [a2, b2, ...c3] = \`abcccl\`
      [a, ...b, c] = \`abbbc\`
      {a3, b: {c: c4}} = {}
    `)
  ).toMatchSnapshot();
});


