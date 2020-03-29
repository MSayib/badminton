<template>
  <div>
    <div>
      <b-container fluid="xl" align="center" style="margin-top: 100px">
        <Stopwatch
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
        <b-row>
          <b-col>
            <b-card border-variant="dark" header="Player A" align="center">
              <b-card-text class="scoreBoard">{{ playerA }}</b-card-text>
            </b-card>
          </b-col>
          <b-col cols="4" style="margin-top: 40px">
            <b-img :src="img" width="60%" fluid alt="Responsive image" />
          </b-col>
          <b-col>
            <b-card border-variant="dark" header="Player B" align="center">
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
            <b-button @click="tambahplayerA" variant="primary">+</b-button>
            <b-button @click="kurangplayerA" variant="danger">-</b-button>
          </b-col>
          <b-col></b-col>
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
      img: "https://i.ya-webdesign.com/images/vs-png-5.png",
      counterBola: 0,
      timerState: "stoped",
      formattedTimer: "00:00:00",
      currentTimer: 0,
      ticker: undefined,
      historys: [{ playerA: 0, playerB: 0, counterBola: "true" }]
    };
  },
  computed: {
    isBolaA() {
      return this.counterBola % 2 === 0;
    },
    isBolaB() {
      return this.counterBola % 2 === 1;
    },
    isMatchPoint() {
      if (this.playerA < 21 && this.playerB < 21) {
        if (
          (this.playerA === 20 && this.playerB !== 20) ||
          (this.playerA !== 20 && this.playerB === 20)
        ) {
          return true;
        } else {
          return false;
        }
      } else if (this.playerA === 29 || this.playerB === 29) {
        return true;
      } else {
        // antara 21 - 29
        if (Math.abs(this.playerA - this.playerB) === 1) {
          return true;
        } else {
          return false;
        }
      }
    },
    isMenangA() {
      if (this.playerA >= 21) {
        if (this.playerA >= this.playerB + 2) {
          return true;
        } else if (this.playerA == 30) {
          return true;
        }
      }
    },
    isMenangB() {
      if (this.playerB >= 21) {
        if (this.playerB >= this.playerA + 2) {
          return true;
        } else if (this.playerB == 30) {
          return true;
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
    status() {
      const orang = this.counterBola % 2 === 0 ? "A" : "B";
      const skorygdigunakan = orang === "A" ? this.playerA : this.playerB;
      const posisi = skorygdigunakan % 2 === 0 ? "Kanan" : "Kiri";
      return `Player ${orang} servis dari ${posisi}`;
    }
  },
  watch: {
    isDeuce(val) {
      if (val) {
        alert("Deuce!!");
      }
    },
    isMatchPoint(val) {
      if (val) {
        alert("Match Point!");
      }
    },
    isMenangA(val) {
      if (val) {
        alert("Player A Menang");
      }
    },
    isMenangB(val) {
      if (val) {
        alert("Player B Menang");
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
      }, 1000);
    },
    formatTime(seconds) {
      const measuredTime = new Date(null);
      measuredTime.setSeconds(seconds);
      const MHSTime = measuredTime.toISOString().substr(11, 8);
      return MHSTime;
    },
    tambahplayerA() {
      this.historys.push({
        playerA: this.playerA,
        playerB: this.playerB,
        counterBola: this.counterBola
      });
      this.playerA++;

      if (this.isBolaB) {
        this.counterBola++;
      }
    },
    kurangplayerA() {
      const lastServe = this.historys.pop();
      this.playerA = lastServe.playerA;
      this.playerB = lastServe.playerB;
      this.counterBola = lastServe.counterBola;
    },
    tambahplayerB() {
      this.historys.push({
        playerA: this.playerA,
        playerB: this.playerB,
        counterBola: this.counterBola
      });
      this.playerB++;

      if (this.isBolaA) {
        this.counterBola++;
      }
    },
    kurangplayerB() {
      const lastServe = this.historys.pop();
      this.playerA = lastServe.playerA;
      this.playerB = lastServe.playerB;
      this.counterBola = lastServe.counterBola;
    },
    resetScore() {
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
