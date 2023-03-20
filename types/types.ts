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

interface MidiDevices {
  [name: string]: MidiDevice;
}

interface MidiDevice {
  [type: string]: MidiController;
}

interface MidiDeviceInfos {
  name: string;
}

interface MidiDeviceInfo {
  [name: string]: MidiDeviceInfos;
}

interface MidiDeviceConfig {
  showInstructions: boolean;
}

interface MidiDeviceConfigs {
  [name: string]: MidiDeviceConfig;
}

export {
  MidiPatches,
  MidiDevice,
  MidiDevices,
  MidiRange,
  MidiParameter,
  MidiParameters,
  MidiController,
  MidiDeviceInfo,
  MidiDeviceConfigs,
};
