// import { readFileSync } from 'fs';
import fs from 'fs';
// import _ from 'lodash';
import path from 'path';
import parser from './parser.js';
import compareData from './compareData.js';
import getFormat from './formatters/index.js';

// import { cwd } from 'node:process';
// import { resolve } from 'node:process'

// const getPath = (way) => {
//  const data = path.resolve(process.cwd(), way);
//  return JSON.parse(data);
// };

const getPath = (way) => path.resolve(process.cwd(), way);

// const getDataParse = (way) => {
//  const data = readFileSync(way, 'utf-8');
//  return JSON.parse(data);
// };

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const resolvedFilepath1 = getPath(filepath1);
  const resolvedFilepath2 = getPath(filepath2);

  const content1 = fs.readFileSync(resolvedFilepath1, 'utf-8');
  const content2 = fs.readFileSync(resolvedFilepath2, 'utf-8');

  const data1 = parser(content1, filepath1.split('.')[1]);
  const data2 = parser(content2, filepath2.split('.')[1]);

  const differences = getFormat(compareData(data1, data2), formatName);
  return differences;

  // const keys1 = Object.keys(data1);
  // const keys2 = Object.keys(data2);
  // const keys = _.sortBy(_.union(keys1, keys2));

  // const result = keys.map((key) => {
  //   if (!_.has(data1, key)) {
  //     return `+ ${key}: ${data2[key]}`;
  //   }
  //   if (!_.has(data2, key)) {
  //     return `- ${key}: ${data1[key]}`;
  //   }
  //   if (_.isEqual(data1[key], data2[key])) {
  //     return `  ${key}: ${data1[key]}`;
  //   }
  //   return [[`- ${key}: ${data1[key]}`], [`+ ${key}: ${data2[key]}`]];
  // });
  // return _.flatten(['{', ...result, '}']).join('\n');
};
export default genDiff;
