import { expect, test } from 'vitest';
import { soma } from './soma';

test('soma 1 + 2 e dá 3', () => {
  expect(soma(1, 2)).toBe(3);
});
