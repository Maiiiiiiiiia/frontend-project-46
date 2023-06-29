import _ from 'lodash';

const sortKeys = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));
  return sortedKeys;
};

const compareData = (obj1, obj2) => {
  const keys = sortKeys(obj1, obj2);
  return keys.map((key) => {
    const obj1HasKey = _.has(obj1, key);
    const obj2HasKey = _.has(obj2, key);
    const value1 = obj1[key];
    const value2 = obj2[key];
    const obj1KeyIsObject = (_.isPlainObject(value1));
    const obj2KeyIsObject = (_.isPlainObject(value2));

    if (obj1HasKey && obj2HasKey && obj1KeyIsObject && obj2KeyIsObject) {
      return {
        type: 'parent',
        key,
        children: compareData(value1, value2),
      };
    }
    if (obj1HasKey && !obj2HasKey) {
      return {
        type: 'deleted',
        key,
        children: value1,
      };
    }
    if (!obj1HasKey && obj2HasKey) {
      return {
        type: 'added',
        key,
        children: value2,
      };
    }
    if (obj1HasKey && obj2HasKey) {
      if (value1 === value2) {
        return {
          type: 'staySame',
          key,
          children: value1,
        };
      }
    }
    return {
      type: 'diffValue',
      key,
      children: value1,
      children2: value2,
    };
  });
};
export default compareData;
