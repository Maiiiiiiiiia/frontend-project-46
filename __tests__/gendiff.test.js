import path, { dirname } from 'path';
import { fileURLToPath } from 'node:url';
// import fs, { readFileSync } from 'fs';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (file) => fs.readFileSync(getFixturePath(file), 'utf-8');

const testCase = ['json', 'yml'];
test.each(testCase)('Get difference of two %s files', (format) => {
  const path1 = getFixturePath(`file1.${format}`);
  const path2 = getFixturePath(`file2.${format}`);

  expect(genDiff(path1, path2, 'stylish')).toBe(readFile('rightValueStylish.txt').trim());
  expect(genDiff(path1, path2, 'plain')).toBe(readFile('rightValuePlain.txt').trim());
  expect(genDiff(path1, path2, 'json')).toBe(readFile('rightValueJson.txt').trim());
  // expect(genDiff(path1, path1)).toBe(readFile('rightValueStylish.txt').trim());
  expect(() => JSON.parse(genDiff(path1, path2, 'json'))).not.toThrow();
});

// const readFile = (file) => {
//   const filePath = getFixturePath(file);
//   const content = fs.readFileSync(filePath, 'utf-8');
//   return content;
// };

// const firstJSON = getFixturePath('file1.json');
// const secondJSON = getFixturePath('file2.json');
// const firstYML = getFixturePath('file1.yml');
// const secondYML = getFixturePath('file2.yml');

// const expectedJSON = readFile('rightValueJson.txt').trim();
// const expectedStylish = readFile('rightValueStylish.txt').trim();
// const expectedPlain = readFile('rightValuePlain.txt').trim();

// test('#1 difference stylish format test between JSON files', () => {
//   expect(genDiff(firstJSON, secondJSON, 'stylish')).toEqual(expectedStylish);
// });

// test('#2 difference stylish format test between YML files', () => {
//   expect(genDiff(firstYML, secondYML, 'stylish')).toEqual(expectedStylish);
// });

// test('#3 difference plain format test between JSON files', () => {
//   expect(genDiff(firstJSON, secondJSON, 'plain')).toEqual(expectedPlain);
// });

// test('#4 difference plain format test between YML files', () => {
//   expect(genDiff(firstYML, secondYML, 'plain')).toEqual(expectedPlain);
// });

// test('#5 difference json format test between JSON files', () => {
//   expect(genDiff(firstJSON, secondJSON, 'json')).toEqual(expectedJSON);
// });

// test('#6 difference json format test between YML files', () => {
//   expect(genDiff(firstYML, secondYML, 'json')).toEqual(expectedJSON);
// });

// test('#7 difference default format test between JSON files', () => {
//   expect(genDiff(firstJSON, secondJSON)).toEqual(expectedStylish);
// });

// test('#8 difference default format test between YML files', () => {
//   expect(genDiff(firstYML, secondYML)).toEqual(expectedStylish);
// });

// test('#9 difference default format test between JSON and YML files', () => {
//   expect(genDiff(firstJSON, secondYML)).toEqual(expectedStylish);
// });

// test('#10 difference plain format test between YML and JSON files', () => {
//   expect(genDiff(firstYML, secondJSON, 'plain')).toEqual(expectedPlain);
// });
