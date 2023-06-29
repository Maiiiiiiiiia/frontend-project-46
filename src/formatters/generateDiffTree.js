const getIndent = (depth, replacer = ' ', spacesCount = 4) => replacer.repeat(spacesCount * depth - 2);

const makeString = (value, depth) => {
  if (!(typeof value === 'object' && value !== null && !Array.isArray(value))) {
    return value;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => {
    const newValue = value[key];
    return `${getIndent(depth + 1)}  ${key}: ${makeString(newValue, depth + 1)}`;
  });
  return `{\n${result.join('\n')}\n  ${getIndent(depth)}}`;
};

const generateDiffTree = (array) => {
  const iter = (node, depth = 1) => {
    const result = node.map((element) => {
      const strChildren = makeString(element.children, depth);
      const strChildren2 = makeString(element.children2, depth);
      const indent = getIndent(depth);
      if (element.type === 'parent') {
        return `${indent}  ${element.key}: {\n${iter(element.children, depth + 1)}\n${indent}  }`;
      }
      if (element.type === 'stay same') {
        return `${indent}  ${element.key}: ${strChildren}`;
      }
      if (element.type === 'deleted') {
        return `${indent}- ${element.key}: ${strChildren}`;
      }
      if (element.type === 'added') {
        return `${indent}+ ${element.key}: ${strChildren}`;
      }
      return `${indent}- ${element.key}: ${strChildren}\n${indent}+ ${element.key}: ${strChildren2}`;
    });

    return result.join('\n');
  };
  return `{\n${iter(array)}\n}`;
};
export default generateDiffTree;
