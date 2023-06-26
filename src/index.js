import fs from 'fs';
import path from 'path';
import parser from './parser.js';
import compareData from './compareData.js';
import getFormat from './formatters/index.js';

const getPath = (way) => path.resolve(process.cwd(), way);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const resolvedFilepath1 = getPath(filepath1);
  const resolvedFilepath2 = getPath(filepath2);

  const content1 = fs.readFileSync(resolvedFilepath1, 'utf-8');
  const content2 = fs.readFileSync(resolvedFilepath2, 'utf-8');

  const data1 = parser(content1, filepath1.split('.')[1]);
  const data2 = parser(content2, filepath2.split('.')[1]);

  const differences = getFormat(compareData(data1, data2), formatName);
  return differences;
};
export default genDiff;
