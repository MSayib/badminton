<template>
  <div>
    <b-container align="center" style="margin-top: 180px">
      <b-row>
        <b-col>
          <h4>Score Counter</h4>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-card border-variant="dark" header="Tim A" align="center">
            <b-card-text class="scoreBoard">{{ teamA }}</b-card-text>
          </b-card>
        </b-col>
        <b-col cols="4" style="margin-top: 40px">
          <b-img :src="img" width="90%" fluid alt="Responsive image" />
        </b-col>
        <b-col>
          <b-card border-variant="dark" header="Tim B" align="center">
            <b-card-text class="scoreBoard">{{ teamB }}</b-card-text>
          </b-card>
        </b-col>
      </b-row>

      <b-row>
        <b-col id="servePosition">
          </b-col> </b-row
      > 

      <b-row>
        <!-- team A -->
        <b-col>
          <b-button @click="tambahTeamA" variant="primary">+</b-button>
          <b-button @click="kurangTeamA" variant="danger">-</b-button>
        </b-col>
        <b-col> </b-col>
        <!-- team B -->
        <b-col>
          <b-button @click="tambahTeamB" variant="primary">+</b-button>
          <b-button @click="kurangTeamB" variant="danger">-</b-button>
        </b-col>
      </b-row>
      <!-- reset button -->
      <b-row style="padding: 0 10px;">
        <b-col>
          <b-button variant="primary" @click="resetScore">Reset Score</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teamA: 0,
      teamB: 0,
      img: "https://i.ya-webdesign.com/images/vs-png-5.png"
    };
  },

  methods: {
    tambahTeamA() {
      this.teamA++;
      if (this.teamA % 2 == 1) {
        document.getElementById("servePosition").innerHTML =
          "Team A serve di kiri";
      } else {
        document.getElementById("servePosition").innerHTML =
          "Team A serve di kanan";
      }
    },
    tambahTeamB() {
      this.teamB++;
      if (this.teamB % 2 == 1) {
        document.getElementById("servePosition").innerHTML =
          "Team B serve di kiri";
      } else {
        document.getElementById("servePosition").innerHTML =
          "Team B serve di kanan";
      }
    },
    kurangTeamA() {
      this.teamA -= 1;
    },

    kurangTeamB() {
      this.teamB -= 1;
    },

    resetScore() {
      (this.teamA = 0), (this.teamB = 0);
    },

    resetData() {
      (this.teamA = 0), (this.teamB = 0), this.$router.push("/start");
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
