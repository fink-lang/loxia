import {fink2js} from '../../testing';


test('compiles fold', ()=> {
  expect(
    fink2js(`
      fold item, acc=0:
        ni = item + acc
        item * acc
    `)
  ).toMatchSnapshot();
});


