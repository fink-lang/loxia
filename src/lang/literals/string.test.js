import {fink2js} from '../../testing';


test('compiles regex', ()=> {
  expect(
    fink2js(`
      str1 = \`
        line 1
        line 2 with leading space
        line 3\`

      str2 = \`ab\`

      str3 = foo\`bar spam \${shrub + ni} na\`

      str4 = \`
        bar
         spam \${shrub + ni}\${foo}
        ni
      \`
    `)
  ).toMatchSnapshot();
});
