// store/filters.ts
import { defineStore } from 'pinia';

import { MidiPatches, MidiDevice } from '@/types/types';

export const usePatchStore = defineStore({
  id: 'patch-store',
  state: () => {
    return {
      midiChannel: 5,
      patches: {
        'nts-1': { Default: {} as MidiDevice },
      } as MidiPatches,
    };
  },
  persist: {
    storage: persistedState.localStorage,
  },
  actions: {
    setPatch(controller: string, parameter: string, value: number) {
      console.log(controller, parameter, value);
    },
    setMidiChannel(channel: number) {
      this.midiChannel = channel;
    },
  },
  getters: {
    getPatches: (state) => state.patches,
    getMidiChannel: (state) => state.midiChannel,
  },
});
