interface GlobalStore {
  midiAccess: boolean;
  midiOutput?: WebMidi.MIDIOutput;
  pageTitle: string;
  currentPatch: string;
  isDemo: boolean;
}

export { GlobalStore };
