import { rangeValues } from '../utils/midi';

const arpLengths = rangeValues([
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
]);

const ocsillators = rangeObjectValues([
  { name: 'Saw (SAW)', editable: false, value: 0 },
  { name: 'Triangle (tr1)', editable: false, value: 0 },
  { name: 'Square (s9r)', editable: false, value: 0 },
  { name: 'VPM (UPN)', editable: false, value: 0 },
  { name: 'Waves', editable: true, value: 0 },
  //  { name: 'J6', editable: true, value: 0 },
  //  { name: 'Proba-b', editable: true, value: 0 },
  //  { name: 'Volca Bass', editable: true, value: 0 },
]);

const filters = rangeValues([
  'Low Pass - 2 Pole',
  'Low Pass - 4 Pole',
  'Band Pass - 2 Pole',
  'Band Pass - 4 Pole',
  'High Pass - 2 Pole',
  'High Pass - 4 Pole',
  'Off',
]);

const egs = rangeValues(['ADSR', 'AHR', 'AR', 'AR Loop', 'Open']);

const modulations = rangeObjectValues([
  { name: 'Off', editable: false, value: 0 },
  { name: 'Chorus', editable: false, value: 0 },
  { name: 'Ensemnble', editable: false, value: 0 },
  { name: 'Phaser', editable: false, value: 0 },
  { name: 'Flanger', editable: false, value: 0 },
]);

const delays = rangeObjectValues([
  { name: 'Off', editable: false, value: 0 },
  { name: 'Stereo', editable: false, value: 0 },
  { name: 'Mono', editable: false, value: 0 },
  { name: 'Ping Pong', editable: false, value: 0 },
  { name: 'High Pass', editable: false, value: 0 },
  { name: 'Tape', editable: false, value: 0 },
]);

const reverbs = rangeObjectValues([
  { name: 'Off', editable: false, value: 0 },
  { name: 'Hall', editable: false, value: 0 },
  { name: 'Plate', editable: false, value: 0 },
  { name: 'Space', editable: false, value: 0 },
  { name: 'Riser', editable: false, value: 0 },
  { name: 'Submarine', editable: false, value: 0 },
]);

const arpPatterns = rangeValues([
  'Up',
  'Down',
  'Up-Down',
  'Down-Up',
  'Converge',
  'Diverge',
  'Converge-Diverge',
  'Diverge-Converge',
  'Random',
  'Stochastic',
]);

const arpIntervals = rangeValues([
  'Octave',
  'Major Triad',
  'Major Suspended',
  'Major Augmented',
  'Minor Triad',
  'Minor Diminished',
]);

export {
  ocsillators,
  modulations,
  delays,
  reverbs,
  arpPatterns,
  arpLengths,
  arpIntervals,
  filters,
  egs,
};
