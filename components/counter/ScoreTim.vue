<template>
  <b-row>
    <b-col>
      <b-card
        border-variant="light"
        class="overflow-hidden"
        style="max-width: 500px;"
      >
        <b-row no-gutters>
          <b-col>
            <b-card-body title="Player A">
              <b-card-text class="scoreBoard">{{ScoreTimA}}</b-card-text>
            </b-card-body>
          </b-col>
          <b-col sm="2">
            <b-card-body>
              <b-card-text>
                <b-img :src="img" width="50%" />
              </b-card-text>
            </b-card-body>
          </b-col>
          <b-col sm="5">
            <b-card-body title="Player B">
              <b-card-text class="scoreBoard">{{ScoreTimB}}</b-card-text>
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
        img: String
    }
};
</script>

<style></style>
