<template>
  <div>
    <div>
      <b-container align="center" style="margin-top: 180px">
        <Stopwatch />
        <b-row>
          <b-col>
            <h4>Score Counter</h4>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <h4>{{ keputusan }}</h4>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-card border-variant="dark" header="Player A" align="center">
              <b-card-text class="scoreBoard">{{ playerA }}</b-card-text>
            </b-card>
          </b-col>
          <b-col cols="4" style="margin-top: 40px">
            <b-img :src="img" width="90%" fluid alt="Responsive image" />
          </b-col>
          <b-col>
            <b-card border-variant="dark" header="Player B" align="center">
              <b-card-text class="scoreBoard">{{ playerB }}</b-card-text>
            </b-card>
          </b-col>
        </b-row>

        <b-row>
          <b-col>{{ status }} </b-col>
        </b-row>

        <b-row>
          <!-- team A -->
          <b-col>
            <b-button @click="tambahplayerA" variant="primary">+</b-button>
            <b-button @click="kurangplayerA" variant="danger">-</b-button>
          </b-col>
          <b-col> </b-col>
          <!-- team B -->
          <b-col>
            <b-button @click="tambahplayerB" variant="primary">+</b-button>
            <b-button @click="kurangplayerB" variant="danger">-</b-button>
          </b-col>
        </b-row>
        <!-- reset button -->
        <b-row style="padding: 0 10px;">
          <b-col>
            <b-button variant="primary" @click="resetScore"
              >Reset Score</b-button
            >
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import Stopwatch from "~/components/stopwatch.vue";

export default {
  components: {
    Stopwatch
  },
  data() {
    return {
      playerA: 0,
      playerB: 0,
      status: "",
      keputusan: "",
      img: "https://i.ya-webdesign.com/images/vs-png-5.png"
    };
  },
  methods: {
    tambahplayerA() {
      this.playerA++;
      if (this.playerA == 20) {
        this.keputusan = "Match Point"
      } else if(this.playerA == 21) {
        this.keputusan = "Player A Win"
      } else {
        this.keputusan = ""
      }
    },
    tambahplayerB() {
      this.playerB++;
      if (this.playerB == 20) {
        this.keputusan = "Match Point"
      } else if(this.playerB == 21) {
        this.keputusan = "Player B Win"
      } else {
        this.keputusan = ""
      }
    },
    kurangplayerA() {
      this.playerA -= 1;
    },
    kurangplayerB() {
      this.playerB -= 1;
    },
    resetScore() {
      (this.playerA = 0), (this.playerB = 0);
    },
    resetData() {
      (this.playerA = 0), (this.playerB = 0);
    }
  }
};
</script>

<style>
.scoreBoard {
  font-size: 60px;
}
.score {
  border: 2px solid;
}
</style>
