import {fink2js} from '../testing';


test('binary', ()=> {
  expect(
    fink2js(`
      math_precedence1 = -1 + 0 + 1 + 2 * 3 % 1
      math_precedence2 = -1 + 0 + (1 + 2) * 3 / 2

      multi_line_assign = 123
        + 234 +
        -567
        - 1111

      group1 = (1 + 2) * 3
      group2 = (34234^-34234) + 1
    `)
  ).toMatchSnapshot();
});
