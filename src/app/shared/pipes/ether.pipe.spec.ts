import { EtherPipe } from './ether.pipe';

xdescribe('EtherPipe', () => {
  it('should return 0 if amount of wei is 0', () => {
    const pipe = new EtherPipe('0');
    expect(pipe.transform('0')).toBe('0');
  });
});
