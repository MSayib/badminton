<template>
  <div>
    <p class="time">{{ timer }}</p>
    <b-button
      variant="info"
      @click="$emit('start')"
      :disabled="state === 'running'"
      ><span>Start</span>
    </b-button>
    <b-button
      variant="warning"
      @click="$emit('pause')"
      :disabled="state === 'stoped' || state === 'paused'"
      ><span>Pause</span></b-button
    >
    <b-button
      variant="danger"
      @click="$emit('stop')"
      :disabled="state === 'stoped'"
      ><span>Stop</span></b-button
    >
  </div>
</template>

<script>
export default {
  name: "Timer",
  props: ["timer", "state"]
};
</script>

<style>
.time {
  font-family: "Share Tech Mono";
  font-size: 2em;
}
</style>
