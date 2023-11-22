<template>
  <MidiGroup
    name="midiGuru"
    class="footer"
  >
    <footer
      class="w-full flex flex-row justify-between items-center text-xs md:text-sm md:ml-6 md:mr-6"
    >
      <section class="h-full flex flex-col items-start text-xxs md:text-sm">
        <p>
          <Icon
            name="fa:instagram"
            size="1.2em"
          />
          <NuxtLink
            class="ml-2"
            to="https://instagram.com/petedottech"
          >petedottech</NuxtLink>
        </p>
        <p>
          <Icon
            name="fa:envelope-o"
            size="1.2em"
          />
        
          <NuxtLink
            class="ml-2"
            to="mailto:midiguru@petedot.tech"
          >midiguru@petedot.tech</NuxtLink>
        </p>
        <p>
          <Icon
            name="fa:chain"
            size="1.2em"
          />
          <NuxtLink
            class="ml-2"
            to="https://hamling.tech"
          >https://hamling.tech</NuxtLink>
        </p>
      </section>

      <section class="h-full flex flex-col items-end text-right md:mr-12">
        <NuxtLink to="/privacy">Privacy Policy</NuxtLink>
        <NuxtLink to="/terms">Terms and Conditions</NuxtLink>
        <p>
          Copyright 2023
        </p>
      </section>
    </footer>
  </MidiGroup>
</template>
