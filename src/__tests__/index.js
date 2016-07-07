import {expect} from 'chai';
import eventual from '../index.js';

describe('eventual', () => {
  describe('a pending value', () => {
    const pendingValue = eventual();

    it('should behave correctly', () => {
      expect(eventual.isPending(pendingValue)).to.eq(true);
      expect(eventual.isError(pendingValue)).to.eq(false);
      expect(eventual.isReady(pendingValue)).to.eq(false);
      expect(eventual.getOrElse(pendingValue)).to.eq(undefined);
      expect(eventual.getOrElse(pendingValue, [])).to.eql([]);
      expect(eventual.status(pendingValue)).to.eq('pending');
    });
  });

  describe('an errored value', () => {
    it('should behave correctly', () => {
      const erroredValue = eventual.reject('error message');
      expect(eventual.isPending(erroredValue)).to.eq(false);
      expect(eventual.isError(erroredValue)).to.eq(true);
      expect(eventual.isReady(erroredValue)).to.eq(false);
      expect(eventual.getOrElse(erroredValue)).to.eq(undefined);
      expect(eventual.getOrElse(erroredValue, [])).to.eql([]);
      expect(eventual.status(erroredValue)).to.eq('error');
    });
  });

  describe('a resolved value', () => {
    it('should behave correctly', () => {
      const resolvedValue = eventual.resolve('YES');
      expect(eventual.isPending(resolvedValue)).to.eq(false);
      expect(eventual.isError(resolvedValue)).to.eq(false);
      expect(eventual.isReady(resolvedValue)).to.eq(true);
      expect(eventual.getOrElse(resolvedValue)).to.eq('YES');
      expect(eventual.getOrElse(resolvedValue, [])).to.eq('YES');
      expect(eventual.status(resolvedValue)).to.eq('ready');
    });
  });
});
