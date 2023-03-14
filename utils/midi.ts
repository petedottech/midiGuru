const rangeValues = (rangeList: Array<string>) => {
  return rangeList.map((item, index) => {
    return {
      name: item,
      value: Math.round(127 / rangeList.length) * index + 1,
    };
  });
};

export { rangeValues };
