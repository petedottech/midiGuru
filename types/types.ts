interface MidiPatch {
  [name: string]: MidiDevice;
}

interface MidiPatches {
  [name: string]: MidiPatch;
}

interface MidiRange {
  name: string;
  value: number;
  editable: boolean;
}

interface MidiParameter {
  type: 'MidiSelect' | 'MidiRange';
  cc_msg: number;
  cc_value: number;
  editable: boolean;
  items: Array<MidiRange>;
}

interface MidiParameters {
  [type: string]: MidiParameter;
}

interface MidiController {
  width: string;
  parameters: MidiParameters;
}

interface MidiControllers {
  [type: string]: MidiController;
}

interface MidiDevices {
  [name: string]: MidiDevice;
}

interface MidiDevice {
  name: string;
  controllers: MidiControllers;
}

export {
  MidiPatches,
  MidiDevice,
  MidiDevices,
  MidiRange,
  MidiParameter,
  MidiParameters,
  MidiController,
  MidiControllers,
};
