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

const ocsillators = rangeValues([
  'Saw (SAW)',
  'Triangle (tr1)',
  'Square (s9r)',
  'VPM (UPN)',
  'Waves',
  'J6',
  'Proba-b',
  'Volca Bass',
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

const modulations = rangeValues([
  'Off',
  'Chorus',
  'Ensemnble',
  'Phaser',
  'Flanger',
]);

const delays = rangeValues([
  'Off',
  'Stereo',
  'Mono',
  'Ping Pong',
  'High Pass',
  'Tape',
]);

const reverbs = rangeValues([
  'Off',
  'Hall',
  'Plate',
  'Space',
  'Riser',
  'Submarine',
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
