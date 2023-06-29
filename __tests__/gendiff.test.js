import path, { dirname } from 'path';
import { fileURLToPath } from 'node:url';
// import fs, { readFileSync } from 'fs';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (file) => fs.readFileSync(getFixturePath(file), 'utf-8');

const testCase = [
  ['json', 'json', undefined, 'rightValueStylish.txt'],
  ['yml', 'yml', undefined, 'rightValueStylish.txt'],
  ['json', 'yml', undefined, 'rightValueStylish.txt'],

  ['json', 'json', 'stylish', 'rightValueStylish.txt'],
  ['yml', 'yml', 'stylish', 'rightValueStylish.txt'],
  ['json', 'yml', 'stylish', 'rightValueStylish.txt'],

  ['json', 'json', 'plain', 'rightValuePlain.txt'],
  ['yml', 'yml', 'plain', 'rightValuePlain.txt'],
  ['json', 'yml', 'plain', 'rightValuePlain.txt'],

  ['json', 'json', 'json', 'rightValueJson.txt'],
  ['yml', 'yml', 'json', 'rightValueJson.txt'],
  ['json', 'yml', 'json', 'rightValueJson.txt'],
];

test.each(testCase)('Get difference of two %s files', (file1case, file2case, format, resultFile) => {
  const path1 = getFixturePath(`file1.${file1case}`);
  const path2 = getFixturePath(`file2.${file2case}`);
  const result = readFile(resultFile);

  expect(genDiff(path1, path2, format)).toBe(result);
});
