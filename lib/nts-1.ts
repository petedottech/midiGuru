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
  { name: 'Saw (SAW)', editable: false },
  { name: 'Triangle (tr1)', editable: false },
  { name: 'Square (s9r)', editable: false },
  { name: 'VPM (UPN)', editable: false },
  { name: 'Waves', editable: true },
  { name: 'J6', editable: true },
  { name: 'Proba-b', editable: true },
  { name: 'Volca Bass', editable: true },
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
  { name: 'Off', editable: false },
  { name: 'Chorus', editable: false },
  { name: 'Ensemnble', editable: false },
  { name: 'Phaser', editable: false },
  { name: 'Flanger', editable: false },
]);

const delays = rangeObjectValues([
  { name: 'Off', editable: false },
  { name: 'Stereo', editable: false },
  { name: 'Mono', editable: false },
  { name: 'Ping Pong', editable: false },
  { name: 'High Pass', editable: false },
  { name: 'Tape', editable: false },
]);

const reverbs = rangeObjectValues([
  { name: 'Off', editable: false },
  { name: 'Hall', editable: false },
  { name: 'Plate', editable: false },
  { name: 'Space', editable: false },
  { name: 'Riser', editable: false },
  { name: 'Submarine', editable: false },
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
