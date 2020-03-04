import {fink2js} from '../../testing';


describe('compiles fold', ()=> {
  it('compiles simple find', ()=> {
    expect(
      fink2js(`
        find item:
          item > 3
      `)
    ).toMatchSnapshot();
  });

  it('compiles complex find', ()=> {
    expect(
      fink2js(`
        find {item}:
          match item:
            {spam}: shrub
            else: ni
      `)
    ).toMatchSnapshot();
  });
});


