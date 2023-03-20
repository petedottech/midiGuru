import { defineStore } from 'pinia';

import { MidiPatches, MidiDevice, MidiDeviceConfigs } from '@/types/types';

export const usePatchStore = defineStore({
  id: 'patch-store',
  state: () => {
    return {
      midiChannel: 5,
      deviceConfig: {
        'nts-1': {
          showInstructions: true,
        },
      } as MidiDeviceConfigs,
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
    setDeviceShowInstructions(device: string, show: boolean) {
      this.deviceConfig[device].showInstructions = show;
    },
  },
  getters: {
    getPatches: (state) => state.patches,
    getMidiChannel: (state) => state.midiChannel,
    getDeviceConfig: (state) => state.deviceConfig,
  },
});
