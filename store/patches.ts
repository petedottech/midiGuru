// store/filters.ts
import { defineStore } from 'pinia';

export const usePatchStore = defineStore({
  id: 'patch-store',
  state: () => {
    return {
      // FIXME this won't work when we have patches across multiple devices...
      currentPatch: 'Default',
      midiChannel: 5,
      patches: {
        'nts-1': {},
      },
    };
  },
  persist: {
    storage: persistedState.localStorage,
  },
  actions: {
    setPatch(controller: string, parameter: string, value: number) {
      console.log(controller, parameter, value);
    },
    setCurrent(patch: string) {
      this.currentPatch = patch;
    },
    setMidiChannel(channel: number) {
      this.midiChannel = channel;
    },
  },
  getters: {
    getPatches: (state) => state.patches,
    getCurrent: (state) => state.currentPatch,
    getMidiChannel: (state) => state.midiChannel,
  },
});
