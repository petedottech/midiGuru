<template>
  <MidiConfig
    class=""
    :blink="blink"
  />

  <div
    v-if="midiState.output !== -1"
    class="grid grid-cols-4 gap-4 grid-flow-row-dense pt-4"
  >
    <MidiGroup
      name="Ocsillator"
      class="col-span-2 nts-1"
    >
      <MidiSelect
        name="Type"
        :cc-msg="53"
        :items="rangeValues(ocsillators)"
        @midi-output="blinkIt()"
      />
      <MidiRange
        name="Shape"
        :cc-msg="54"
        :cc-value-default="60"
        @midi-output="blinkIt()"
      />
      <MidiRange
        name="Alt"
        :cc-msg="55"
        @midi-output="blinkIt()"
      />
      <MidiRange
        name="LFO Rate"
        :cc-msg="24"
        @midi-output="blinkIt()"
      />
      <MidiRange
        name="LFO Depth"
        :cc-msg="26"
        @midi-output="blinkIt()"
      />
    </MidiGroup>

    <MidiGroup
      name="Filter"
      class="row-span-1 col-span-2 nts-1"
    >
      <MidiSelect
        name="Type"
        :cc-msg="42"
        :items="
          [
            { name: 'Low Pass - 2 Pole', value: 0 },
            { name: 'Low Pass - 4 Pole', value: 18 },
            { name: 'Band Pass - 2 Pole', value: 36 },
            { name: 'Band Pass - 4 Pole', value: 54 },
            { name: 'High Pass - 2 Pole', value: 72 },
            { name: 'High Pass - 4 Pole', value: 90 },
            { name: 'Off', value: 108 },
          ]"
        @midi-output="blinkIt()"
      />
      <MidiRange
        name="Cutoff"
        :cc-msg="43"
        :cc-value-default="60"
        @midi-output="blinkIt()"
      />
      <MidiRange
        name="Resonance"
        :cc-msg="44"
        @midi-output="blinkIt()"
      />
      <MidiRange
        name="Sweep depth"
        :cc-msg="45"
        @midi-output="blinkIt()"
      />
      <MidiRange
        name="Rate"
        :cc-msg="46"
        @midi-output="blinkIt()"
      />
    </MidiGroup>

    <MidiGroup
      name="EG"
      class="row-span-1 nts-1"
    >
      <MidiSelect
        name="Type"
        :cc-msg="14"
        :items="
          [
            { name: 'ADSR', value: 0 },
            { name: 'AHR', value: 25 },
            { name: 'AR', value: 50 },
            { name: 'AR Loop', value: 75 },
            { name: 'Open', value: 100 },
          ]"
        @midi-output="blinkIt()"
      />
      <MidiRange
        name="Attack"
        :cc-msg="16"
        @midi-output="blinkIt()"
      />
      <MidiRange
        name="Release"
        :cc-msg="19"
        @midi-output="blinkIt()"
      />
      <MidiRange
        name="Tremalo Depth"
        :cc-msg="20"
        @midi-output="blinkIt()"
      />
      <MidiRange
        name="Tremalo Rate"
        :cc-msg="21"
        @midi-output="blinkIt()"
      />
    </MidiGroup>

    <MidiGroup
      name="Modulation"
      class="nts-1"
    >
      <MidiSelect
        name="Type"
        :cc-msg="88"
        :items="rangeValues(modulations)"
        @midi-output="blinkIt()"
      />
      <MidiRange
        name="Time"
        :cc-msg="28"
        :cc-value-default="60"
        @midi-output="blinkIt()"
      />
      <MidiRange
        name="Depth"
        :cc-msg="29"
        @midi-output="blinkIt()"
      />
    </MidiGroup>

    <MidiGroup
      name="Delay"
      class="nts-1"
    >
      <MidiSelect
        name="Type"
        :cc-msg="89"
        :items="rangeValues(delays)"
        @midi-output="blinkIt()"
      />
      <MidiRange
        name="Time"
        :cc-msg="30"
        @midi-output="blinkIt()"
      />
      <MidiRange
        name="Depth"
        :cc-msg="31"
        @midi-output="blinkIt()"
      />
      <MidiRange
        name="Mix"
        :cc-msg="33"
        @midi-output="blinkIt()"
      />
    </MidiGroup>

    <MidiGroup
      name="Reverb"
      class="nts-1"
    >
      <MidiSelect
        name="Type"
        :cc-msg="90"
        :items="rangeValues(reverbs)"
        @midi-output="blinkIt()"
      />
      <MidiRange
        name="Time"
        :cc-msg="34"
        @midi-output="blinkIt()"
      />
      <MidiRange
        name="Depth"
        :cc-msg="35"
        @midi-output="blinkIt()"
      />
      <MidiRange
        name="Mix"
        :cc-msg="36"
        @midi-output="blinkIt()"
      />
    </MidiGroup>

    <MidiGroup
      name="Arp"
      class="col-span-4 nts-1"
    >
      <MidiSelect
        name="Pattern"
        :cc-msg="117"
        :items="rangeValues(arpPatterns)"
        @midi-output="blinkIt()"
      />
      <MidiSelect
        name="Intervals"
        :cc-msg="118"
        :items="
          [
            { name: 'Octave', value: 0 },
            { name: 'Major Triad', value: 21 },
            { name: 'Major Suspended', value: 42 },
            { name: 'Major Augmented', value: 63 },
            { name: 'Minor Triad', value: 84 },
            { name: 'Minor Diminished', value: 105 },
          ]"
        @midi-output="blinkIt()"
      />
      <MidiSelect
        name="Length"
        :cc-msg="119"
        :items="rangeValues(arpLengths)"
        @midi-output="blinkIt()"
      />
    </MidiGroup>
  </div>
</template>
  
<script setup lang="ts">
const midiState = useMidiState();
const navState = useNavState();

const blink = ref(false);

const blinkIt = () => {
  console.log('Blink')
  console.log(blink);
  blink.value = !blink.value;
  console.log(blink);
  console.log('Blink')
}

onMounted(() => {
  navState.value.pageTitle = 'KORG NTS-1'
});

const arpLengths = [
  1, 2, 3, 4, 5, 6,
  7, 8, 9, 10, 11, 12,
  13, 14, 15, 16, 17, 18,
  19, 20, 21, 22, 23, 24
]

const ocsillators = [
  'Saw (SAW)',
  'Triangle (tr1)',
  'Square (s9r)',
  'VPM (UPN)',
  'Waves',
  'J6',
  'Proba-b',
  'Volca Bass'
];

const modulations = [
  'Off',
  'Chorus',
  'Ensemnble',
  'Phaser',
  'Flanger',
]

const delays = [
  'Off',
  'Stereo',
  'Mono',
  'Ping Pong',
  'High Pass',
  'Tape',
]

const reverbs = [
  'Off',
  'Hall',
  'Plate',
  'Space',
  'Riser',
  'Submarine',
]

const arpPatterns = [
  'Up',
  'Down',
  'Up-Down',
  'Down-Up',
  'Converge',
  'Diverge',
  'Converge-Diverge',
  'Diverge-Converge',
  'Random',
  'Stochastic'
]

const rangeValues = rangeList => {
  return rangeList.map((item, index) => {
    return { name: item, value: (Math.round(127 / rangeList.length) * index) + 1 }
  })
}
</script>