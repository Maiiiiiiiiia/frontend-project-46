import generateDiffTree from './stylish.js';
import plain from './plain.js';

const getFormat = (data, format = 'stylish') => {
  switch (format) {
    case 'stylish':
      return generateDiffTree(data, 0);
    case 'json':
      return JSON.stringify(data);
    case 'plain':
      return plain(data);
    default:
      throw new Error(`${format} is not supported`);
  }
};

export default getFormat;
