import {fink2js} from '../../testing';


test('compiles assignment', ()=> {
  expect(
    fink2js(`
      assign = 1
      assign2 = assign

      no_clash_with_await = 13

      assign_lang_const1 = true
      assign_lang_const2 = false

      multi_line_assign = 123
        + 234 +
        -567
        - 1111
    `)
  ).toMatchSnapshot();
});

