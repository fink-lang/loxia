import {fink2js} from '../testing';


test('compiles map', ()=> {
  expect(
    fink2js(`
      map item: item * 2
      map item=123: item * 2
      map {item}: item * 2
      map [x, y]: x + y

      flat_map item: [spam + item]

      flat_map item: [spam]
    `)
  ).toMatchSnapshot();
});


