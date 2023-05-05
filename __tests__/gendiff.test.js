import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const gd = genDiff();

const rightValueJson = readFileSync('__fixtures__/rightValueJson', 'utf8');
test('gd', () => {
  const path1 = '__fixtures__/file1.json';
  const path2 = '__fixtures__/file2.json';
  expect(gd(path1, path2)).toBe(rightValueJson);
});
