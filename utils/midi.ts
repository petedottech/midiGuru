const rangeValues = (rangeList: Array<string>) => {
  return rangeList.map((item, index) => {
    return {
      name: item,
      value: Math.round(127 / rangeList.length) * index + 1,
    };
  });
};

interface rangeObject {
  name: string;
  editable: boolean;
}

const rangeObjectValues = (rangeList: Array<rangeObject>) => {
  return rangeList.map((item, index) => {
    return {
      name: item.name,
      editable: item.editable,
      value: Math.round(127 / rangeList.length) * index + 1,
    };
  });
};

export { rangeValues, rangeObjectValues };
