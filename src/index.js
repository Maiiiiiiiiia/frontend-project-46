import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';
import { cwd } from 'node:process';

const getDataParse = (path) => {
  const data = readFileSync(path, 'utf-8');
  return JSON.parse(data);
};

const genDiff = (filepath1, filepath2) => {
  const resolvedFilepath1 = path.resolve(cwd(), filepath1);
  const resolvedFilepath2 = path.resolve(cwd(), filepath2);

  const data1 = getDataParse(resolvedFilepath1);
  const data2 = getDataParse(resolvedFilepath2);

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const result = keys.map((key) => {
    if (!_.has(data1, key)) {
      return `+ ${key}: ${data2[key]}`;
    }
    if (!_.has(data2, key)) {
      return `- ${key}: ${data1[key]}`;
    }
    if (_.isEqual(data1[key], data2[key])) {
      return `  ${key}: ${data1[key]}`;
    }
    return [[`- ${key}: ${data1[key]}`], [`+ ${key}: ${data2[key]}`]];
  });
  return _.flatten(['{', ...result, '}']).join('\n');
};
export default genDiff;
