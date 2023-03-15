// store/filters.ts
import { defineStore } from 'pinia';

export const useGlobalStore = defineStore({
  id: 'global-store',
  state: () => {
    return {
      midiAccess: false,
      midiOutput: -1,
      pageTitle: '',
    };
  },
  //  persist: {
  //    storage: persistedState.localStorage,
  //  },
  actions: {
    setMidiAccess(access: boolean) {
      this.midiAccess = access;
    },
    setMidiOutput(output: number) {
      this.midiOutput = output;
    },
    setPageTitle(title: string) {
      this.pageTitle = title;
    },
  },
  getters: {
    getMidiAccess: (state) => state.midiAccess,
    getMidiOutput: (state) => state.midiOutput,
    getPageTitle: (state) => state.pageTitle,
  },
});
