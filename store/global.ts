// store/filters.ts
import { defineStore } from 'pinia';

import { GlobalStore } from '~~/types/globalStore';

export const useGlobalStore = defineStore({
  id: 'global-store',
  state: () => {
    return {
      midiAccess: false,
      midiOutput: undefined,
      pageTitle: '',
      currentPatch: 'Default',
      isDemo: false,
    } as GlobalStore;
  },
  //  persist: {
  //    storage: persistedState.localStorage,
  //  },
  actions: {
    setMidiAccess(access: boolean) {
      this.midiAccess = access;
    },
    setMidiOutput(output: WebMidi.MIDIOutput) {
      this.midiOutput = output;
    },
    setPageTitle(title: string) {
      this.pageTitle = title;
    },
    setCurrentPatch(patch: string) {
      this.currentPatch = patch;
    },
    setIsDemo(isDemo: boolean) {
      this.isDemo = isDemo;
    },
  },
  getters: {
    getMidiAccess: (state) => state.midiAccess,
    getMidiOutput: (state) => state.midiOutput,
    getPageTitle: (state) => state.pageTitle,
    getCurrentPatch: (state) => state.currentPatch,
    getIsDemo: (state) => state.isDemo,
  },
});
