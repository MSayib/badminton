<template>
  <div>
    <b-row>
      <b-col>
        <b-card no-body class="overflow-hidden" style="max-width: 350px;">
          <b-row no-gutters>
            <b-col md="4">
              <b-card-body title="Set">
                <b-card-text class="set">
                  1
                </b-card-text>
              </b-card-body>
            </b-col>
            <b-col md="8">
              <b-card-body title="Timer">
                <b-card-text>
                  <p class="time">{{ timer }}</p>
                  <b-button
                    variant="info"
                    pill
                    size="sm"
                    @click="$emit('start')"
                    :disabled="state === 'running'"
                    ><span>Start</span>
                  </b-button>
                  <b-button
                    variant="warning"
                    pill
                    size="sm"
                    @click="$emit('pause')"
                    :disabled="state === 'stoped' || state === 'paused'"
                    ><span>Pause</span></b-button
                  >
                  <b-button
                    variant="danger"
                    pill
                    size="sm"
                    @click="$emit('stop')"
                    :disabled="state === 'stoped'"
                    ><span>Stop</span></b-button
                  >
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
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
  font-size: 1.2em;
}
.set {
  font-family: "Share Tech Mono";
  font-size: 2em;
}
</style>
