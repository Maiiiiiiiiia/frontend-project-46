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
const firstYML = getFixturePath('file1.yml');
const secondYML = getFixturePath('file2.yml');

const expectedJSON = readFile('rightValueJson.txt').trim();
const expectedYML = readFile('rightValueStylish.txt').trim();
const expectedPlain = readFile('rightValuePlain.txt').trim();

test('#1 getDiff JSON file', () => {
  expect(genDiff(firstJSON, secondJSON)).toEqual(expectedJSON);
});

test('#2 getDiff YML file', () => {
  expect(genDiff(firstYML, secondYML)).toEqual(expectedYML);
});

test('#3 plain', () => {
  expect(genDiff(firstYML, secondJSON)).toEqual(expectedPlain);
});