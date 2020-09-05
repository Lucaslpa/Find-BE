import sum from './sum';

describe('Number', () => {
  test('should return 3', () => {
    const res = sum(1, 2);
    expect(res).toBe(3);
  });
});
