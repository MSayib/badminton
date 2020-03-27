<template>
  <div>
    <div>
      <b-container fluid="xl" align="center" style="margin-top: 60px">
        <Stopwatch />
        <b-row>
          <b-col>
            <h4>Score Counter</h4>
          </b-col>
        </b-row>
        <b-row>
          <!-- <b-col>
            <h4>{{ keputusan }}</h4>
          </b-col>-->
        </b-row>
        <b-row>
          <b-col>
            <b-card border-variant="dark" header="Player A1 / Player A2" align="center">
              <b-card-text class="scoreBoard">{{ playerA }}</b-card-text>
            </b-card>
          </b-col>
          <b-col cols="4" style="margin-top: 40px">
            <b-img :src="img" width="90%" fluid alt="Responsive image" />
          </b-col>
          <b-col>
            <b-card border-variant="dark" header="Player B1 / Player B2" align="center">
              <b-card-text class="scoreBoard">{{ playerB }}</b-card-text>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <!-- <b-col>isKananA {{ isKananA }} || isKananB {{ isKananB }}</b-col> -->
          <b-col>{{ status }}</b-col>
          <!-- <b-col>isServeA :{{ isServeA }} isServeB:{{ isServeB }}</b-col>
          <b-col>whoIsServe {{ whoIsServe }}</b-col> -->
        </b-row>
        <b-row>
          <!-- team A -->
          <b-col>
            <b-button @click="tambahPlayerA" variant="primary">+</b-button>
            <b-button @click="kurangPlayerA" variant="danger">-</b-button>
          </b-col>
          <b-col></b-col>
          <!-- team B -->
          <b-col>
            <b-button @click="tambahPlayerB" variant="primary">+</b-button>
            <b-button @click="kurangPlayerB" variant="danger">-</b-button>
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
      img: "https://i.ya-webdesign.com/images/vs-png-5.png",
      isServeA: 0,
      isServeB: 0,
      whoIsServe: true
    };
  },

  computed: {
    isKananA() {
      return this.isServeA % 2 === 0;
    },
    isKananB() {
      return this.isServeB % 2 === 1;
    },
    isMatchPoint() {
      if (this.playerA <= 21 && this.playerB <= 21) {
        if (
          (this.playerA === 20 && this.playerB !== 20) ||
          (this.playerA !== 20 && this.playerB == 20)
        ) {
          return true;
        } else {
          return false;
        }
      } else if (this.playerA === 29 && this.playerB === 29) {
        return true;
      } else {
        if (Math.abs(this.playerA - this.playerB) === 1) {
          return true;
        } else {
          return false;
        }
      }
    },
    isDeuce() {
      if (this.playerA >= 20 && this.playerB >= 20) {
        if (this.playerA === this.playerB) {
          return true;
        }
      }

      return false;
    },
    isMenangA() {
      if (this.playerA >= 21) {
        if (this.playerA >= this.playerB + 2) {
          return true;
        } else if (this.playerA === 30) {
          return true;
        }
      }
    },
    isMenangB() {
      if (this.playerB >= 21) {
        if (this.playerB >= this.playerA + 2) {
          return true;
        } else if (this.playerB === 30) {
          return true;
        }
      }
    },
    status() {
      const siapaSihYangServe = this.whoIsServe === true ? "Team A" : "Team B";


      // Buat Tim A kalo dia yang serve
      const ohTeamAServe = siapaSihYangServe === "Team A" ? this.isServeA : "";
      const mauSiapaNihYangServeA = ohTeamAServe % 2 === 0 ? "A1" : "A2";
      const posisiServeADimana = this.playerA % 2 === 0 ? "Kanan" : "Kiri";

      const ohTeamBServe = siapaSihYangServe === "Team B" ? this.isServeB : "";
      const mauSiapaNihYangServeB = ohTeamBServe % 2 === 0 ? "B2" : "B1";
      const posisiServeBDimana = this.playerB % 2 === 0 ? "Kanan" : "Kiri";

      return `Pemain ${siapaSihYangServe === "Team A" ? mauSiapaNihYangServeA : mauSiapaNihYangServeB}
      serve di posisi ${siapaSihYangServe === "Team A" ? posisiServeADimana : posisiServeBDimana}`;
    }
  },

  watch: {
    isMatchPoint(val) {
      if (val) {
        alert("Match Point!");
      }
    },
    isDeuce(val) {
      if (val) {
        alert("Deuce!");
      }
    },
    isMenangA(val) {
      if (val) {
        alert("Tim A Menang!");
      }
    },
    isMenangB(val) {
      if (val) {
        alert("Tim B Menang");
      }
    },
    playerA() {
      this.whoIsServe = true;
      if (this.isKananA && !this.isKananB) {
        return;
      } else if (!this.isKananA && !this.isKananB) {
        this.isServeB++;
      } else if (this.isKananA && this.isKananB) {
        this.isServeB++;
      }
    },
    playerB() {
      this.whoIsServe = false;
      if (this.isKananA && !this.isKananB) {
        this.isServeA++;
      } else if (!this.isKananA && this.isKananB) {
        this.isServeA++;
      }
    }
  },
  methods: {
    tambahPlayerA() {
      this.playerA++;
    },
    kurangPlayerA() {
      if (this.playerA > 0) {
        this.playerA--;
      }
    },
    tambahPlayerB() {
      this.playerB++;
    },
    kurangPlayerB() {
      if (this.playerB > 0) {
        this.playerB--;
      }
    },
    resetScore() {
      this.playerA = 0;
      this.playerB = 0;
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
