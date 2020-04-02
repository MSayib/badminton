<template>
  <b-row>
    <b-col>
      <b-card
        border-variant="light"
        class="overflow-hidden"
        style="max-width: 800px;"
      >
        <b-row no-gutters>
          <b-col>
            <b-card-body :title="`${timA} (${A || A1 + ' / ' + A2})`">
              <b-card-text class="scoreBoard">{{ ScoreTimA }}</b-card-text>
            </b-card-body>
          </b-col>
          <b-col sm="2">
            <b-card-body>
              <b-card-text>
                <b-img :src="img" width="50%" />
              </b-card-text>
            </b-card-body>
          </b-col>
          <b-col>
            <b-card-body :title="`${timB} (${B || B1 + ' / ' + B2})`">
              <b-card-text class="scoreBoard">{{ ScoreTimB }}</b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    ScoreTimA: Number,
    ScoreTimB: Number,
    A: String,
    B: String,
    timA: String,
    timB: String,
    A1: String,
    A2: String,
    B1: String,
    B2: String,
    img: String
  }
};
</script>

<style></style>
