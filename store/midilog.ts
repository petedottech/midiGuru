import { defineStore } from 'pinia';

export const useMidiLogStore = defineStore({
  id: 'midilog-store',
  state: () => ({
    messages: [] as Array<string>,
  }),
  actions: {
    log(message: string) {
      this.messages.push(message);
    },
  },
});
