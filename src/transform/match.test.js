import {fink2js} from '../testing';


test('compiles logical', ()=> {
  expect(
    // TODO: remove foo =
    fink2js(`
      with_else = match shrub:
        {foo: 4, ni}: spam + ni
        123: spam
        [1, 2, ni]: ni
        else: shrub

      no_else = match shrub:
        {foo: 4, ni}: spam + ni
        123: spam

      nested = match shrub:
        {foo: 4, ni: {na, nu}}: spam + ni
        [1, 2, [ni]]: ni
        123: spam
    `)
  ).toMatchSnapshot();
});
