// store/filters.ts
import { defineStore } from 'pinia';

import { MidiDevices, MidiDeviceInfo, MidiRange } from '~~/types/types';

import {
  ocsillators,
  modulations,
  delays,
  reverbs,
  arpLengths,
  arpPatterns,
  arpIntervals,
  filters,
  egs,
} from '@/lib/nts-1';

export const useDeviceStore = defineStore({
  id: 'device-store',
  state: () => {
    return {
      current: '' as string,
      deviceInfo: {
        'nts-1': {
          name: 'KORG NTS-1',
          info: '## Some markdown text?',
        },
      } as MidiDeviceInfo,
      devices: {
        'nts-1': {
          Oscillator: {
            width: 'span-2',
            parameters: {
              Type: {
                type: 'MidiSelect',
                cc_msg: 53,
                cc_value: 1,
                editable: true,
                items: ocsillators,
              },
              Shape: {
                type: 'MidiRange',
                cc_msg: 54,
                cc_value: 0,
                editable: false,
                items: new Array<MidiRange>(),
              },
              Alt: {
                type: 'MidiRange',
                cc_msg: 55,
                cc_value: 0,
                editable: false,
                items: new Array<MidiRange>(),
              },
              'LFO Rate': {
                type: 'MidiRange',
                cc_msg: 24,
                cc_value: 0,
                editable: false,
                items: new Array<MidiRange>(),
              },
              'LFO Depth': {
                type: 'MidiRange',
                cc_msg: 26,
                cc_value: 0,
                editable: false,
                items: new Array<MidiRange>(),
              },
            },
          },
          Filter: {
            width: 'span-2',
            parameters: {
              Type: {
                type: 'MidiSelect',
                cc_msg: 42,
                cc_value: 1,
                editable: false,
                items: filters,
              },
              Cutoff: {
                type: 'MidiRange',
                cc_msg: 43,
                cc_value: 127,
                editable: false,
                items: new Array<MidiRange>(),
              },
              Resonance: {
                type: 'MidiRange',
                cc_msg: 44,
                cc_value: 0,
                editable: false,
                items: new Array<MidiRange>(),
              },
              'Sweep depth': {
                type: 'MidiRange',
                cc_msg: 45,
                cc_value: 0,
                editable: false,
                items: new Array<MidiRange>(),
              },
              Rate: {
                type: 'MidiRange',
                cc_msg: 46,
                cc_value: 0,
                editable: false,
                items: new Array<MidiRange>(),
              },
            },
          },
          EG: {
            width: 'span-1',
            parameters: {
              Type: {
                type: 'MidiSelect',
                cc_msg: 14,
                cc_value: 1,
                editable: false,
                items: egs,
              },
              Attack: {
                type: 'MidiRange',
                cc_msg: 16,
                cc_value: 0,
                editable: false,
                items: new Array<MidiRange>(),
              },
              Release: {
                type: 'MidiRange',
                cc_msg: 19,
                cc_value: 64,
                editable: false,
                items: new Array<MidiRange>(),
              },
              'Tremalo Depth': {
                type: 'MidiRange',
                cc_msg: 20,
                cc_value: 0,
                editable: false,
                items: new Array<MidiRange>(),
              },
              'Tremalo Rate': {
                type: 'MidiRange',
                cc_msg: 21,
                cc_value: 0,
                editable: false,
                items: new Array<MidiRange>(),
              },
            },
          },
          Modulation: {
            width: 'span-1',
            parameters: {
              Type: {
                type: 'MidiSelect',
                cc_msg: 88,
                cc_value: 1,
                items: modulations,
                editable: true,
              },
              Time: {
                type: 'MidiRange',
                cc_msg: 28,
                cc_value: 60,
                editable: false,
                items: new Array<MidiRange>(),
              },
              Depth: {
                type: 'MidiRange',
                cc_msg: 29,
                cc_value: 0,
                editable: false,
                items: new Array<MidiRange>(),
              },
            },
          },
          Delay: {
            width: 'span-1',
            parameters: {
              Type: {
                type: 'MidiSelect',
                cc_msg: 89,
                cc_value: 1,
                items: delays,
                editable: true,
              },
              Time: {
                type: 'MidiRange',
                cc_msg: 30,
                cc_value: 0,
                editable: false,
                items: new Array<MidiRange>(),
              },
              Depth: {
                type: 'MidiRange',
                cc_msg: 31,
                cc_value: 0,
                editable: false,
                items: new Array<MidiRange>(),
              },
              Mix: {
                type: 'MidiRange',
                cc_msg: 33,
                cc_value: 0,
                editable: false,
                items: new Array<MidiRange>(),
              },
            },
          },
          Reverb: {
            width: 'span-1',
            parameters: {
              Type: {
                type: 'MidiSelect',
                cc_msg: 90,
                cc_value: 1,
                items: reverbs,
                editable: true,
              },
              Time: {
                type: 'MidiRange',
                cc_msg: 34,
                cc_value: 0,
                editable: false,
                items: new Array<MidiRange>(),
              },
              Depth: {
                type: 'MidiRange',
                cc_msg: 35,
                cc_value: 0,
                editable: false,
                items: new Array<MidiRange>(),
              },
              Mix: {
                type: 'MidiRange',
                cc_msg: 36,
                cc_value: 0,
                editable: false,
                items: new Array<MidiRange>(),
              },
            },
          },
          Arp: {
            width: 'span-4',
            parameters: {
              Pattern: {
                type: 'MidiSelect',
                cc_msg: 117,
                cc_value: 1,
                items: arpPatterns,
                editable: false,
              },
              Intervals: {
                type: 'MidiSelect',
                cc_msg: 118,
                cc_value: 1,
                items: arpIntervals,
                editable: false,
              },
              Length: {
                type: 'MidiSelect',
                cc_msg: 119,
                cc_value: 1,
                items: arpLengths,
                editable: false,
              },
            },
          },
        },
        /*
        'volca-drum': {
          name: 'KORG Volca Drum',
            'Wave guide': {
              width: 'span-4',
              parameters: {
                'Model type': {
                  type: 'MidiSelect',
                  cc_msg: 53,
                  cc_value: 0,
                  items: ['Tube', 'String'],
                },
                Decay: {
                  type: 'MidiRange',
                  cc_msg: 34,
                  cc_value: 0,
                },
                Body: {
                  type: 'MidiRange',
                  cc_msg: 34,
                  cc_value: 0,
                },
                Tune: {
                  type: 'MidiRange',
                  cc_msg: 34,
                  cc_value: 0,
                },
              },
            },
            'Part 1 - Layer 1': {
              width: 'span-2',
              parameters: {
                'Sound source': {
                  type: 'MidiSelect',
                  cc_msg: 53,
                  cc_value: 0,
                  items: ['Wave', 'Saw', 'X', 'Y', 'Z'],
                },
                'Mod Type': {
                  type: 'MidiSelect',
                  cc_msg: 53,
                  cc_value: 0,
                  items: ['Ramp', 'Sine', 'Noise'],
                },
                'Amp EG': {
                  type: 'MidiSelect',
                  cc_msg: 53,
                  cc_value: 0,
                  items: ['Ramp', 'Expo', 'Double'],
                },
                Level: {
                  type: 'MidiRange',
                  cc_msg: 34,
                  cc_value: 0,
                },
                Pitch: {
                  type: 'MidiRange',
                  cc_msg: 34,
                  cc_value: 0,
                },
                Attack: {
                  type: 'MidiRange',
                  cc_msg: 34,
                  cc_value: 0,
                },
                Release: {
                  type: 'MidiRange',
                  cc_msg: 34,
                  cc_value: 0,
                },
                'Mod amount': {
                  type: 'MidiRange',
                  cc_msg: 34,
                  cc_value: 0,
                },
                'Mod rate': {
                  type: 'MidiRange',
                  cc_msg: 34,
                  cc_value: 0,
                },
              },
            },
            'Part 1 - Layer 2': {
              width: 'span-2',
              parameters: {
                'Sound source': {
                  type: 'MidiSelect',
                  cc_msg: 53,
                  cc_value: 0,
                  items: ['Wave', 'Saw', 'X', 'Y', 'Z'],
                },
                'Mod Type': {
                  type: 'MidiSelect',
                  cc_msg: 53,
                  cc_value: 0,
                  items: ['Ramp', 'Sine', 'Noise'],
                },
                'Amp EG': {
                  type: 'MidiSelect',
                  cc_msg: 53,
                  cc_value: 0,
                  items: ['Ramp', 'Expo', 'Double'],
                },
                Level: {
                  type: 'MidiRange',
                  cc_msg: 34,
                  cc_value: 0,
                },
                Pitch: {
                  type: 'MidiRange',
                  cc_msg: 34,
                  cc_value: 0,
                },
                Attack: {
                  type: 'MidiRange',
                  cc_msg: 34,
                  cc_value: 0,
                },
                Release: {
                  type: 'MidiRange',
                  cc_msg: 34,
                  cc_value: 0,
                },
                'Mod amount': {
                  type: 'MidiRange',
                  cc_msg: 34,
                  cc_value: 0,
                },
                'Mod rate': {
                  type: 'MidiRange',
                  cc_msg: 34,
                  cc_value: 0,
                },
              },
            },
            'Part 1 - Processing': {
              width: 'span-4',
              parameters: {
                'Wave guide send': {
                  type: 'MidiRange',
                  cc_msg: 34,
                  cc_value: 0,
                },
                'Bit reduction': {
                  type: 'MidiRange',
                  cc_msg: 34,
                  cc_value: 0,
                },
                Fold: {
                  type: 'MidiRange',
                  cc_msg: 34,
                  cc_value: 0,
                },
                Drive: {
                  type: 'MidiRange',
                  cc_msg: 34,
                  cc_value: 0,
                },
                Pan: {
                  type: 'MidiRange',
                  cc_msg: 34,
                  cc_value: 64,
                },
                Gain: {
                  type: 'MidiRange',
                  cc_msg: 34,
                  cc_value: 0,
                },
                'Pitch quantization': {
                  type: 'MidiSelect',
                  cc_msg: 53,
                  cc_value: 0,
                  items: ['On'],
                },
              },
            },
        },
        */
      } as MidiDevices,
    };
  },
  actions: {
    setCurrent(value: string) {
      this.current = value;
    },
  },
  getters: {
    getDevices: (state) => state.devices,
    getDeviceInfo: (state) => state.deviceInfo,
    getCurrent: (state) => state.current,
  },
});
