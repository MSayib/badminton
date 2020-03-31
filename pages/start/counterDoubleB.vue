<template>
  <div>
    <div>
      <b-container fluid="xl" align="center" style="margin-top: 50px">
        <b-row>
          <b-col>
            <h5>Pilih Server</h5>
            <nuxt-link to="/start/counterDouble">
              <b-button variant="primary">Serve Tim A</b-button>
            </nuxt-link>
            <b-button variant="danger">Serve Tim B</b-button>
          </b-col>
        </b-row>
        <Ronde
          :timer="formattedTimer"
          :state="timerState"
          @start="start"
          @pause="pause"
          @stop="stop"
        />
        <b-row>
          <b-col>
            <h4>Score Counter</h4>
          </b-col>
        </b-row>
        <b-row></b-row>
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
          <b-col>{{ status }}</b-col>
        </b-row>

        <b-row>
          <!-- team A -->
          <b-col>
            <b-button size="lg" @click="tambahPlayerA" variant="primary">+</b-button>
            <b-button size="lg" @click="kurangPlayerA" variant="danger">-</b-button>
          </b-col>
          <b-col></b-col>
          <!-- team B -->
          <b-col>
            <b-button size="lg" @click="tambahPlayerB" variant="primary">+</b-button>
            <b-button size="lg" @click="kurangPlayerB" variant="danger">-</b-button>
          </b-col>
        </b-row>
        <!-- reset button -->
        <b-row style="padding: 0 10px;">
          <b-col>
            <b-button size="sm" variant="primary" @click="resetScore">Reset Score</b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import Ronde from "~/components/counter/ronde.vue";

export default {
  components: {
    Ronde
  },
  data() {
    return {
      playerA: 0,
      playerB: 0,
      img: "https://i.ya-webdesign.com/images/vs-png-5.png",
      isServeA: 0,
      isServeB: 0,
      whoIsServe: true,
      timerState: "stoped",
      currentTimer: 0,
      formattedTimer: "00:00:00",
      ticker: undefined,
      historys: []
    };
  },

  computed: {
    isKananA() {
      return this.isServeA % 2 === 1;
    },
    isKananB() {
      return this.isServeB % 2 === 0;
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
      const siapaSihYangServe = this.whoIsServe === true ? "Team B" : "Team A";

      // Buat Tim A kalo dia yang serve
      const ohTeamAServe = siapaSihYangServe === "Team A" ? this.isServeA : "";
      const mauSiapaNihYangServeA = ohTeamAServe % 2 === 0 ? "A2" : "A1";
      const posisiServeADimana = this.playerA % 2 === 0 ? "Kanan" : "Kiri";
      // Buat Tim B kalo dia serve
      const ohTeamBServe = siapaSihYangServe === "Team B" ? this.isServeB : "";
      const mauSiapaNihYangServeB = ohTeamBServe % 2 === 0 ? "B1" : "B2";
      const posisiServeBDimana = this.playerB % 2 === 0 ? "Kanan" : "Kiri";

      return `Pemain ${
        siapaSihYangServe === "Team A"
          ? mauSiapaNihYangServeA
          : mauSiapaNihYangServeB
      }
      serve di posisi ${
        siapaSihYangServe === "Team A" ? posisiServeADimana : posisiServeBDimana
      }`;
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
      this.whoIsServe = false;
      if (this.isKananB && !this.isKananA) {
        this.isServeB++;
      } else if (!this.isKananB && this.isKananA) {
        this.isServeB++;
      }
    },
    playerB() {
      this.whoIsServe = true;
      if (this.isKananB && !this.isKananA) {
        return;
      } else if (!this.isKananB && !this.isKananA) {
        this.isServeA++;
      } else if (this.isKananB && this.isKananA) {
        this.isServeA++;
      }
    }
  },
  methods: {
    start() {
      if (this.timerState !== "running") {
        this.tick();
        this.timerState = "running";
      }
    },
    pause() {
      window.clearInterval(this.ticker);
      this.timerState = "paused";
    },
    stop() {
      window.clearInterval(this.ticker);
      this.currentTimer = 0;
      this.formattedTimer = "00:00:00";
      this.timerState = "stoped";
    },
    tick() {
      this.ticker = setInterval(() => {
        this.currentTimer++;
        this.formattedTimer = this.formatTime(this.currentTimer);
      }, 250);
    },
    formatTime(seconds) {
      const measuredTime = new Date(null);
      measuredTime.setSeconds(seconds);
      const MHSTime = measuredTime.toISOString().substr(11, 8);
      return MHSTime;
    },
    tambahPlayerA() {
      this.historys.push({
        scoreA: this.playerA,
        scoreB: this.playerB,
        serveA: this.isServeA,
        serveB: this.isServeB,
        playerA: this.whoIsServe
      });
      this.playerA++;
      console.log(this.historys);
    },
    kurangPlayerA() {
      const lastState = this.historys.pop();
      this.playerB = lastState.scoreB;
      this.playerA = lastState.scoreA;
      this.isServeA = lastState.serveA;
      this.isServeB = lastState.serveB;
      this.whoIsServe = lastState.playerA;

      console.log(this.historys);
    },
    tambahPlayerB() {
      this.historys.push({
        scoreA: this.playerA,
        scoreB: this.playerB,
        serveA: this.isServeA,
        serveB: this.isServeB,
        playerA: this.whoIsServe
      });
      this.playerB++;
      console.log(this.historys);
    },
    kurangPlayerB() {
      const lastState = this.historys.pop();
      this.playerB = lastState.scoreB;
      this.playerA = lastState.scoreA;
      this.isServeA = lastState.serveA;
      this.isServeB = lastState.serveB;
      this.whoIsServe = lastState.playerA;
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
  font-size: 2.5em;
}
</style>
