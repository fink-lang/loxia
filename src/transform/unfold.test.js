import {fink2js} from '../testing';


test('compiles unfold', ()=> {
  expect(
    fink2js(`
      unfold curr=start:
        (curr + inc, curr * 2)

      count = (start=0, inc=1):
        unfold curr=start:
          curr + inc
    `)
  ).toMatchSnapshot();
});
