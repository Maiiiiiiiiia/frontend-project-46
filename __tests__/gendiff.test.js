// import { readFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (file) => {
  const filePath = getFixturePath(file);
  const content = fs.readFileSync(filePath, 'utf-8');
  return content;
};

const firstJSON = getFixturePath('file1.json');
const secondJSON = getFixturePath('file2.json');

const expectedStylish = readFile('rightValueJson.txt').trim();

test('getDiff', () => {
  expect(genDiff(firstJSON, secondJSON)).toBe(expectedStylish);
});
