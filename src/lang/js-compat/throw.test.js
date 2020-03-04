import {fink2js} from '../../testing';


describe('throw', ()=> {
  it('transforms throw', ()=> {
    expect(
      fink2js(`
        fn bar:
          match true:
            has_err(bar): throw err('spam')
            else: bar
      `)
    ).toMatchSnapshot();
  });
});
