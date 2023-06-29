import _ from 'lodash';

const letSortKeys = (data1, data2) => {
  const childrenOfObj1 = Object.keys(data1);
  const childrenOfObj2 = Object.keys(data2);
  const sortedKeys = _.sortBy(_.union(childrenOfObj1, childrenOfObj2));
  return sortedKeys;
};

const compareData = (obj1, obj2) => {
  const keys = letSortKeys(obj1, obj2);
  return keys.map((key) => {
    const obj1HasKey = _.has(obj1, key);
    const obj2HasKey = _.has(obj2, key);
    const value1 = obj1[key];
    const value2 = obj2[key];
    const obj1KeyIsObject = (_.isPlainObject(value1) && value1 !== null && !Array.isArray(value1));
    const obj2KeyIsObject = (_.isPlainObject(value2) && value2 !== null && !Array.isArray(value2));

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
    if (obj1HasKey && obj2HasKey) {
      if (value1 === value2) {
        return {
          type: 'stay same',
          key,
          children: value1,
        };
      }
      return {
        type: 'diffValue',
        key,
        children: value1,
        children2: value2,
      };
    }
    return {
      type: 'added',
      key,
      children: value2,
    };
  });
};
export default compareData;
