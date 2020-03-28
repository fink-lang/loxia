import {fink2js} from '../../testing';


test('compiles assignment', ()=> {
  expect(
    fink2js(`
      # foobar spam ham
      foo = 123

      ---
      Shrub ni.
      ---
      bar = fn:
        spam
    `)
  ).toMatchSnapshot();
});
