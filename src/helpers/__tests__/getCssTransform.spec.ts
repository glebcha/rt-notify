import { getCssTransform } from '../getCssTransform';

describe('Change Emitter', () => {
  it('should properly implement add/remove events', () => {
     const defaultValue = getCssTransform();
     const hasValue = /(transform):\s?\w+\D\d+\D+;/.exec(defaultValue);
     const hasDefaultClassName = /&.(default)\W+\w+-\w+\W+{/.exec(defaultValue);

     expect(hasValue).toBeTruthy();
     expect(hasDefaultClassName).toBeTruthy();
  });
 });
 