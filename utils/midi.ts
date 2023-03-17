import { MidiRange } from '~~/types/types';

const rangeValues = (rangeList: Array<string>) => {
  return rangeList.map((item, index) => {
    return {
      name: item,
      value: Math.round(127 / rangeList.length) * index + 1,
      editable: false,
    } as MidiRange;
  });
};

const rangeObjectValues = (rangeList: Array<MidiRange>) => {
  return rangeList.map((item, index) => {
    return {
      name: item.name,
      editable: item.editable,
      value: Math.round(127 / rangeList.length) * index + 1,
    } as MidiRange;
  });
};

export { rangeValues, rangeObjectValues };
