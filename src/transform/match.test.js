import {fink2js} from '../testing';


test('compiles logical', ()=> {
  expect(
    fink2js(`
      # with else
      match shrub:
        {foo: 4, ni}: spam + ni
        123: spam
        [1, 2, ni]: ni
        else: shrub

      # no else
      match shrub:
        {foo: 4, ni}: spam + ni
        123: spam

      # nesting
      match shrub:
        {foo: 4, ni: {na, nu}}: spam + ni
        [1, 2, [ni]]: ni
        123: spam
    `)
  ).toMatchSnapshot();
});
