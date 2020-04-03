<template>
  <div>
    <div>
      <b-container fluid="xl" align="center" style="margin-top: 10px">
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
        <b-row></b-row>
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
                  <b-card-body :title="A1 + '/' + A2">
                    <b-card-text class="scoreBoard">{{ playerA }}</b-card-text>
                  </b-card-body>
                </b-col>
                <b-col sm="5" v-else>
                  <b-card-body :title="B1 + '/' + B2">
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
                  <b-card-body :title="B1 + '/' + B2">
                    <b-card-text class="scoreBoard">{{ playerB }}</b-card-text>
                  </b-card-body>
                </b-col>
                <b-col sm="5" v-else>
                  <b-card-body :title="A1 + '/' + A2">
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
            <b-button size="lg" @click="tambahPlayerA" variant="primary"
              >+</b-button
            >
            <b-button size="lg" @click="kurangPlayerA" variant="danger"
              >-</b-button
            >
          </b-col>

          <b-col v-else>
            <b-button size="lg" @click="tambahPlayerB" variant="primary"
              >+</b-button
            >
            <b-button size="lg" @click="kurangPlayerB" variant="danger"
              >-</b-button
            >
          </b-col>
          <b-col></b-col>
          <!-- team B -->
          <b-col v-if="this.set.length % 2 === 0">
            <b-button size="lg" @click="tambahPlayerB" variant="primary"
              >+</b-button
            >
            <b-button size="lg" @click="kurangPlayerB" variant="danger"
              >-</b-button
            >
          </b-col>

          <b-col v-else>
            <b-button size="lg" @click="tambahPlayerA" variant="primary"
              >+</b-button
            >
            <b-button size="lg" @click="kurangPlayerA" variant="danger"
              >-</b-button
            >
          </b-col>
        </b-row>
        <!-- reset button -->
        <b-row style="padding: 8px 14px;">
          <b-col>
            <b-button size="sm" variant="primary" @click="resetScore"
              >Reset Score</b-button
            >
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <ScoreTim
              :ScoreTimA="ScoreTimA"
              :ScoreTimB="ScoreTimB"
              :img="img"
              :A1="A1"
              :A2="A2"
              :B1="B1"
              :B2="B2"
              :timA="NamaTimA"
              :timB="NamaTimB"
            />
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import Ronde from "~/components/counter/ronde.vue";
import ScoreTim from "~/components/counter/ScoreTim.vue";
import Swal from "sweetalert2";
import db from "~/plugins/firebase";

export default {
  components: {
    Ronde,
    ScoreTim
  },
  data() {
    return {
      partai: "double",
      playerA: 0,
      playerB: 0,
      ScoreTimA: 0,
      ScoreTimB: 0,
      A1: "",
      A2: "",
      B1: "",
      B2: "",
      NamaTimA: "",
      NamaTimB: "",
      img: "https://i.ya-webdesign.com/images/vs-png-5.png",
      isServeA: 0,
      isServeB: 0,
      whoIsServe: true,
      timerState: "stoped",
      currentTimer: 0,
      formattedTimer: "00:00:00",
      ticker: undefined,
      historys: [],
      set: [],
      tim: [],
      scoreTim: []
    };
  },
  mounted() {
    const resA = JSON.parse(localStorage.getItem("playerA"));
    this.A1 = resA[0]["name"];
    this.A2 = resA[1]["name"];

    const resB = JSON.parse(localStorage.getItem("playerB"));
    this.B1 = resB[0]["name"];
    this.B2 = resB[1]["name"];

    this.NamaTimA = JSON.parse(localStorage.getItem("timA"));
    this.NamaTimB = JSON.parse(localStorage.getItem("timB"));
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
    isMenangPertandinganA() {
      if (this.ScoreTimA >= 0) {
        if (this.ScoreTimA >= this.ScoreTimB + 2) {
          return true;
        } else if (this.ScoreTimA === 2) {
          return true;
        }
      }
    },
    isMenangPertandinganB() {
      if (this.ScoreTimB >= 0) {
        if (this.ScoreTimB >= this.ScoreTimA + 2) {
          return true;
        } else if (this.ScoreTimB === 2) {
          return true;
        }
      }
    },
    status() {
      const siapaSihYangServe = this.whoIsServe === true ? "Team A" : "Team B";

      // Buat Tim A kalo dia yang serve
      const ohTeamAServe = siapaSihYangServe === "Team A" ? this.isServeA : "";
      const mauSiapaNihYangServeA = ohTeamAServe % 2 === 0 ? this.A1 : this.A2;
      const posisiServeADimana = this.playerA % 2 === 0 ? "Kanan" : "Kiri";
      // Buat Tim B kalo dia serve
      const ohTeamBServe = siapaSihYangServe === "Team B" ? this.isServeB : "";
      const mauSiapaNihYangServeB = ohTeamBServe % 2 === 0 ? this.B2 : this.B1;
      const posisiServeBDimana = this.playerB % 2 === 0 ? "Kanan" : "Kiri";

      return `${
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
        alert(`${this.A1} dan ${this.A2} Menang`);
        const ronde = this.set.length + 1;
        this.set.push({
          ronde: ronde,
          stopwatch: this.formattedTimer,
          tim: [
            {
              nama_tim: `${this.A1} dan ${this.A2}`,
              score: this.playerA
            },
            {
              nama_tim: `${this.B1} dan ${this.B2}`,
              score: this.playerB
            }
          ]
        });
        window.clearInterval(this.ticker);
        this.currentTimer = 0;
        this.formattedTimer = "00:00:00";
        this.timerState = "stoped";
        if (this.set.length % 2 === 0) {
          this.whoIsServe = true;
          this.isServeA = 0;
          this.isServeB = 0;
        } else {
          this.whoIsServe = false;
          this.isServeA = 1;
          this.isServeB = 1;
        }
        this.playerA = 0;
        this.playerB = 0;

        this.ScoreTimA++;
      }
    },
    isMenangB(val) {
      if (val) {
        alert(`${this.B1} dan ${this.B2} Menang`);
        const ronde = this.set.length + 1;
        this.set.push({
          ronde: ronde,
          stopwatch: this.formattedTimer,
          tim: [
            {
              nama_tim: `${this.A1} dan ${this.A2}`,
              score: this.playerA
            },
            {
              nama_tim: `${this.B1} dan ${this.B2}`,
              score: this.playerB
            }
          ]
        });
        window.clearInterval(this.ticker);
        this.currentTimer = 0;
        this.formattedTimer = "00:00:00";
        this.timerState = "stoped";
        if (this.set.length % 2 === 0) {
          this.whoIsServe = true;
          this.isServeA = 0;
          this.isServeB = 0;
        } else {
          this.whoIsServe = false;
          this.isServeA = 1;
          this.isServeB = 1;
        }
        this.playerA = 0;
        this.playerB = 0;

        this.ScoreTimB++;
      }
    },
    isMenangPertandinganA(val) {
      if (val) {
        alert("Pemenenang Pertandingan Tim A");
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
        Toast.fire({
          position: "center",
          icon: "success",
          title: `Mantap! ${this.NamaTimA} Kalian Menang`
        });
        this.tim.push(
          {
            tim: this.namaTimA,
            pemain: [this.A1, this.A2]
          },
          { tim: this.namaTimB, pemain: [this.B1, this.B2] }
        );
        this.scoreTim.push({
          scoreTimA: this.ScoreTimA,
          scoreTimB: this.ScoreTimB
        });
        localStorage.setItem("scoreTim", JSON.stringify(this.scoreTim));
        localStorage.setItem("set", JSON.stringify(this.set));
        localStorage.setItem("tim", JSON.stringify(this.tim));
        localStorage.setItem("partai", JSON.stringify(this.partai));
        this.$router.push("/start/resultDouble");
      }
    },
    isMenangPertandinganB(val) {
      if (val) {
        alert("Pemenang Pertandingan Tim B");
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
        Toast.fire({
          position: "center",
          icon: "success",
          title: `Mantap! ${this.NamaTimB} Kalian Menang`
        });
        this.tim.push(
          {
            tim: this.namaTimA,
            pemain: [this.A1, this.A2]
          },
          { tim: this.namaTimB, pemain: [this.B1, this.B2] }
        );
        this.scoreTim.push({
          scoreTimA: this.ScoreTimA,
          scoreTimB: this.ScoreTimB
        });
        localStorage.setItem("scoreTim", JSON.stringify(this.scoreTim));
        localStorage.setItem("set", JSON.stringify(this.set));
        localStorage.setItem("tim", JSON.stringify(this.tim));
        localStorage.setItem("partai", JSON.stringify(this.partai));
        this.$router.push("/start/resultDouble");
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
    tambahPlayerA() {
      this.whoIsServe = true;
      this.historys.push({
        scoreA: this.playerA,
        scoreB: this.playerB,
        serveA: this.isServeA,
        serveB: this.isServeB,
        playerA: this.whoIsServe
      });
      this.playerA++;
      console.log(this.historys);

      if (this.set.length % 2 === 0) {
        if (this.isKananA && !this.isKananB) {
          return;
        } else if (!this.isKananA && !this.isKananB) {
          this.isServeB++;
        } else if (this.isKananA && this.isKananB) {
          this.isServeB++;
        }
      } else {
        if (this.isKananA && !this.isKananB) {
          this.isServeB++;
        } else if (!this.isKananA && this.isKananB) {
          this.isServeB++;
        }
      }
    },
    kurangPlayerA() {
      const lastState = this.historys.pop();
      this.playerB = lastState.scoreB;
      this.playerA = lastState.scoreA;
      this.isServeA = lastState.serveA;
      this.isServeB = lastState.serveB;
      this.whoIsServe = lastState.playerA;

      if (
        confirm(`Apakah yang serve sebelumnya adalah ${this.A1} / ${this.A2}?`)
      ) {
        this.whoIsServe = true;
      } else {
        this.whoIsServe = false;
      }

      console.log(this.historys);
    },
    tambahPlayerB() {
      this.whoIsServe = false;
      this.historys.push({
        scoreA: this.playerA,
        scoreB: this.playerB,
        serveA: this.isServeA,
        serveB: this.isServeB,
        playerA: this.whoIsServe
      });

      this.playerB++;
      console.log(this.historys);

      if (this.set.length % 2 === 0) {
        if (this.isKananA && !this.isKananB) {
          this.isServeA++;
        } else if (!this.isKananA && this.isKananB) {
          this.isServeA++;
        }
      } else {
        if (this.isKananA && this.isKananB) {
          this.isServeA++;
        } else if (!this.isKananA && !this.isKananB) {
          this.isServeA++;
        }
      }
    },
    kurangPlayerB() {
      const lastState = this.historys.pop();
      this.playerB = lastState.scoreB;
      this.playerA = lastState.scoreA;
      this.isServeA = lastState.serveA;
      this.isServeB = lastState.serveB;
      this.whoIsServe = lastState.playerA;

      if (
        confirm(`Apakah yang serve sebelumnya adalah ${this.A1} / ${this.A2}?`)
      ) {
        this.whoIsServe = true;
      } else {
        this.whoIsServe = false;
      }

      console.log(this.historys);
    },
    resetScore() {
      (this.playerA = 0),
        (this.playerB = 0),
        (this.isServeA = 0),
        (this.isServeB = 0),
        (this.whoIsServe = true);
    }
  }
};
</script>

<style>
*{
  text-transform: capitalize;
}

.scoreBoard {
  font-size: 2.5em;
}
</style>
