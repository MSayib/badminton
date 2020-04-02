<template>
  <b-row>
    <b-col>
      <b-card
        border-variant="light"
        class="overflow-hidden"
        style="max-width: 500px;"
      >
        <b-row no-gutters>
          <b-col v-for="(nameA, indexb) in A" :key="indexb">
            <b-card-body :title="nameA.name">
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
          <b-col sm="5" v-for="(nameB, indexc) in B" :key="indexc">
            <b-card-body :title="nameB.name">
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
    A: Array,
    B: Array,
    A1: String,
    A2: String,
    B1: String,
    B2: String,
    img: String
  },
};
</script>

<style></style>
