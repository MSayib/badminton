<template>
  <div>
    <div>
      <b-container fluid="xl" align="center">
        <b-row>
          <b-col>
            <h4>Score Counter</h4>
          </b-col>
        </b-row>
        <Ronde
          :timer="formattedTimer"
          :state="timerState"
          @start="start"
          @pause="pause"
          @stop="stop"
          :set="this.set.length + 1"
        />
        <b-row>
          <b-col>
            <b-card
              border-variant="dark"
              class="overflow-hidden"
              style="max-width: 970px;"
              :header="`SET ${this.set.length + 1}`"
            >
              <b-row no-gutters>
                <b-col sm="5" v-if="this.set.length % 2 === 0">
                  <b-card-body :title="A">
                    <b-card-text class="scoreBoard">{{ playerA }}</b-card-text>
                  </b-card-body>
                </b-col>
                <b-col sm="5" v-else>
                  <b-card-body :title="B">
                    <b-card-text class="scoreBoard">{{ playerB }}</b-card-text>
                  </b-card-body>
                </b-col>
                <b-col sm="2">
                  <b-card-body>
                    <b-card-text>
                      <b-img :src="img" width="50%" />
                    </b-card-text>
                  </b-card-body>
                </b-col>
                <b-col sm="5" v-if="this.set.length % 2 === 0">
                  <b-card-body :title="B">
                    <b-card-text class="scoreBoard">{{ playerB }}</b-card-text>
                  </b-card-body>
                </b-col>
                <b-col sm="5" v-else>
                  <b-card-body :title="A">
                    <b-card-text class="scoreBoard">{{ playerA }}</b-card-text>
                  </b-card-body>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>

        <b-row>
          <b-col>{{ status }}</b-col>
        </b-row>
        <b-row>
          <!-- team A -->
          <b-col v-if="this.set.length % 2 === 0">
            <b-button size="lg" @click="tambahplayerA" variant="primary"
              >+</b-button
            >
            <b-button size="lg" @click="kurangplayerA" variant="danger"
              >-</b-button
            >
          </b-col>

          <b-col v-else>
            <b-button size="lg" @click="tambahplayerB" variant="primary"
              >+</b-button
            >
            <b-button size="lg" @click="kurangplayerB" variant="danger"
              >-</b-button
            >
          </b-col>
          <!-- team B -->
          <b-col v-if="this.set.length % 2 === 0">
            <b-button size="lg" @click="tambahplayerB" variant="primary"
              >+</b-button
            >
            <b-button size="lg" @click="kurangplayerB" variant="danger"
              >-</b-button
            >
          </b-col>

          <b-col v-else>
            <b-button size="lg" @click="tambahplayerA" variant="primary"
              >+</b-button
            >
            <b-button size="lg" @click="kurangplayerA" variant="danger"
              >-</b-button
            >
          </b-col>
        </b-row>
        <!-- reset button -->
        <b-row>
          <b-col>
            <b-button variant="primary" @click="resetScore"
              >Reset Score</b-button
            >
            <!-- <b-button variant="info" @click="simpanSet">Simpan Round</b-button> -->
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <ScoreTim :ScoreTimA="ScoreTimA" :ScoreTimB="ScoreTimB" :img="img"/>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import Ronde from "~/components/counter/ronde.vue";
import ScoreTim from "~/components/counter/ScoreTim.vue";

export default {
  components: {
    Ronde,
    ScoreTim
  },
  data() {
    return {
      playerA: 19,
      playerB: 19,
      A: "Player A",
      B: "Player B",
      ScoreTimA: 0,
      ScoreTimB: 0,
      img: "https://i.ya-webdesign.com/images/vs-png-5.png",
      counterBola: 0,
      timerState: "stoped",
      formattedTimer: "00:00:00",
      currentTimer: 0,
      ticker: undefined,
      historys: [],
      set: []
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
    isMenangPertandinganA() {
      if (this.ScoreTimA >= 0) {
        if (this.ScoreTimA >= this.ScoreTimB + 1) {
          return true;
        }
      }
    },
    isMenangPertandinganB() {
      if (this.ScoreTimB >= 0) {
        if (this.ScoreTimB >= this.ScoreTimA + 1) {
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
        const ronde = this.set.length + 1;
        this.set.push({
          ronde: ronde,
          stopwatch: this.formattedTimer,
          tim: [
            {
              nama_tim: "A",
              score: this.playerA
            },
            {
              nama_tim: "B",
              score: this.playerB
            }
          ]
        });
        window.clearInterval(this.ticker);
        this.currentTimer = 0;
        this.formattedTimer = "00:00:00";
        this.counterBola = 0;
        this.playerA = 0;
        this.playerB = 0;

        this.ScoreTimA++;

        console.log("Ronde :", this.set);
      } else {
        ("");
      }
    },
    isMenangB(val) {
      if (val) {
        alert("Player B Menang");
        const ronde = this.set.length + 1;
        this.set.push({
          ronde: ronde,
          stopwatch: this.formattedTimer,
          tim: [
            {
              nama_tim: "A",
              score: this.playerA
            },
            {
              nama_tim: "B",
              score: this.playerB
            }
          ]
        });
        window.clearInterval(this.ticker);
        this.currentTimer = 0;
        this.formattedTimer = "00:00:00";
        this.counterBola = 0;
        this.playerA = 0;
        this.playerB = 0;

        this.ScoreTimB++;

        console.log("Ronde :", this.set);
      }
    },
    isMenangPertandinganA(val) {
      if (val) {
        alert("Pemenang Pertandingan Tim A");
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
    // simpanSet() {
    //   const ronde = this.set.length + 1;
    //   this.set.push({
    //     ronde: ronde,
    //     stopwatch: this.formattedTimer,
    //     tim: [
    //       {
    //         nama_tim: "A",
    //         score: this.playerA
    //       },
    //       {
    //         nama_tim: "B",
    //         score: this.playerB
    //       }
    //     ]
    //   });
    //   window.clearInterval(this.ticker);
    //   this.currentTimer = 0;
    //   this.formattedTimer = "00:00:00";
    //   this.counterBola = 0;
    //   this.playerA = 0;
    //   this.playerB = 0;

    //   console.log("Ronde :", this.set);
    // },
    resetScore() {
      (this.playerA = 0), (this.playerB = 0), (this.counterBola = 0);
    }
  }
};
</script>

<style>
.scoreBoard {
  font-size: 2.5em;
}
</style>
