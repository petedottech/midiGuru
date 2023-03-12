import { MidiConfig } from '~~/types/midi';

const midiConfig = { haveAccess: false, channel: -1, output: -1 } as MidiConfig;

export const useMidiState = () =>
  useState<MidiConfig>('midiState', () => midiConfig);
