import {fink2js} from '../../testing';


test('compiles unfold', ()=> {
  expect(
    fink2js(`
      unfold curr=start:
        (curr + inc, curr * 2)

      unfold curr:
        (curr + inc, curr * 2)

      unfold:
        1234

      count = fn start=0, inc=1:
        unfold curr=start:
          curr + inc
    `)
  ).toMatchSnapshot();
});
