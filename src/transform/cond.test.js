import {fink2js} from '../testing';


test('compiles conditional', ()=> {
  expect(
    fink2js(`
      with_else = if:
        foo == true: spam
        shrub == 134: ni
        else: shrub

      no_else = if:
        foo == true: spam
        shrub == 134: ni
    `)
  ).toMatchSnapshot();
});


