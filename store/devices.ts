// store/filters.ts
import { defineStore } from 'pinia';

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
      current: '',
      devices: {
        'nts-1': {
          name: 'KORG NTS-1',
          controllers: {
            Ocsilllator: {
              width: 'col-span-2',
              parameters: {
                Type: {
                  type: 'MidiSelect',
                  cc_msg: 53,
                  cc_value: 0,
                  items: ocsillators,
                },
                Shape: {
                  type: 'MidiRange',
                  cc_msg: 54,
                  cc_value: 0,
                },
                Alt: {
                  type: 'MidiRange',
                  cc_msg: 55,
                  cc_value: 0,
                },
                'LFO Rate': {
                  type: 'MidiRange',
                  cc_msg: 24,
                  cc_value: 0,
                },
                'LFO Depth': {
                  type: 'MidiRange',
                  cc_msg: 26,
                  cc_value: 0,
                },
              },
            },
            Filter: {
              width: 'col-span-2',
              parameters: {
                Type: {
                  type: 'MidiSelect',
                  cc_msg: 42,
                  cc_value: 0,
                  items: filters,
                },
                Cutoff: {
                  type: 'MidiRange',
                  cc_msg: 43,
                  cc_value: 127,
                },
                Resonance: {
                  type: 'MidiRange',
                  cc_msg: 44,
                  cc_value: 0,
                },
                'Sweep depth': {
                  type: 'MidiRange',
                  cc_msg: 45,
                  cc_value: 0,
                },
                Rate: {
                  type: 'MidiRange',
                  cc_msg: 46,
                  cc_value: 0,
                },
              },
            },
            EG: {
              width: 'col-span-1',
              parameters: {
                Type: {
                  type: 'MidiSelect',
                  cc_msg: 14,
                  cc_value: 0,
                  items: egs,
                },
                Attack: {
                  type: 'MidiRange',
                  cc_msg: 16,
                  cc_value: 0,
                },
                Release: {
                  type: 'MidiRange',
                  cc_msg: 19,
                  cc_value: 64,
                },
                'Tremalo Depth': {
                  type: 'MidiRange',
                  cc_msg: 20,
                  cc_value: 0,
                },
                'Tremalo Rate': {
                  type: 'MidiRange',
                  cc_msg: 21,
                  cc_value: 0,
                },
              },
            },
            Modulation: {
              width: 'col-span-1',
              parameters: {
                Type: {
                  type: 'MidiSelect',
                  cc_msg: 88,
                  cc_value: 0,
                  items: modulations,
                },
                Time: {
                  type: 'MidiRange',
                  cc_msg: 28,
                  cc_value: 60,
                },
                Depth: {
                  type: 'MidiRange',
                  cc_msg: 29,
                  cc_value: 0,
                },
              },
            },
            Delay: {
              width: 'col-span-1',
              parameters: {
                Type: {
                  type: 'MidiSelect',
                  cc_msg: 89,
                  cc_value: 0,
                  items: delays,
                },
                Time: {
                  type: 'MidiRange',
                  cc_msg: 30,
                  cc_value: 0,
                },
                Depth: {
                  type: 'MidiRange',
                  cc_msg: 31,
                  cc_value: 0,
                },
                Mix: {
                  type: 'MidiRange',
                  cc_msg: 33,
                  cc_value: 0,
                },
              },
            },
            Reverb: {
              width: 'col-span-1',
              parameters: {
                Type: {
                  type: 'MidiSelect',
                  cc_msg: 90,
                  cc_value: 0,
                  items: reverbs,
                },
                Time: {
                  type: 'MidiRange',
                  cc_msg: 34,
                  cc_value: 0,
                },
                Depth: {
                  type: 'MidiRange',
                  cc_msg: 35,
                  cc_value: 0,
                },
                Mix: {
                  type: 'MidiRange',
                  cc_msg: 36,
                  cc_value: 0,
                },
              },
            },
            Arp: {
              width: 'col-span-4',
              parameters: {
                Pattern: {
                  type: 'MidiSelect',
                  cc_msg: 117,
                  cc_value: 0,
                  items: arpPatterns,
                },
                Intervals: {
                  type: 'MidiSelect',
                  cc_msg: 118,
                  cc_value: 0,
                  items: arpIntervals,
                },
                Length: {
                  type: 'MidiSelect',
                  cc_msg: 119,
                  cc_value: 16,
                  items: arpLengths,
                },
              },
            },
          },
        },
        'volca-drum': {
          name: 'KORG Volca Drum',
          controllers: [],
        },
      },
    };
  },
  actions: {
    setCurrent(value: string) {
      this.current = value;
    },
  },
  getters: {
    getDevices: (state) => state.devices,
    getCurrent: (state) => state.current,
  },
});
