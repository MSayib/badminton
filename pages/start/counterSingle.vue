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
            <ScoreTim
              :ScoreTimA="ScoreTimA"
              :ScoreTimB="ScoreTimB"
              :img="img"
              :A="A"
              :B="B"
              :timA="namaTimA"
              :timB="namaTimB"
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
import { getUserFromCookie } from "~/helpers";
import * as firebase from "firebase/app";
import "firebase/auth";
import db from "~/plugins/firebase";

export default {
  components: {
    Ronde,
    ScoreTim
  },
  data() {
    return {
      playerA: 19,
      playerB: 19,
      A: "",
      B: "",
      namaTimA: "",
      namaTimB: "",
      ScoreTimA: 0,
      ScoreTimB: 0,
      img: "https://i.ya-webdesign.com/images/vs-png-5.png",
      counterBola: 0,
      timerState: "stoped",
      formattedTimer: "00:00:00",
      currentTimer: 0,
      ticker: undefined,
      historys: [],
      partai: "single",
      set: [],
      tim: [],
      scoreTim: []
    };
  },
  asyncData({ req, redirect }) {
    if (process.server) {
      const user = getUserFromCookie(req);
      console.log(user);
      if (!user) {
        redirect("/start/counterSingle");
      }
    } else {
      let user = firebase.auth().currentUser;
      if (!user) {
        redirect("/auth/login");
      }
    }
  },
  mounted() {
    const resA = JSON.parse(localStorage.getItem("playerA"));
    this.A = resA["name"];
    const resB = JSON.parse(localStorage.getItem("playerB"));
    this.B = resB["name"];
    this.namaTimA = JSON.parse(localStorage.getItem("timA"));
    this.namaTimB = JSON.parse(localStorage.getItem("timB"));
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
    isDeuce() {
      if (this.playerA >= 20 && this.playerB >= 20) {
        if (this.playerA === this.playerB) {
          return true;
        }
      }
      return false;
    },
    status() {
      const orang = this.counterBola % 2 === 0 ? `${this.A}` : `${this.B}`;
      const skorygdigunakan = orang === "A" ? this.playerA : this.playerB;
      const posisi = skorygdigunakan % 2 === 0 ? "Kanan" : "Kiri";
      return `${orang} servis dari ${posisi}`;
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
        alert(this.A + " is Win !");
        const ronde = this.set.length + 1;
        this.set.push({
          ronde: ronde,
          stopwatch: this.formattedTimer,
          tim: [
            {
              nama_tim: this.namaTimA,
              score: this.playerA
            },
            {
              nama_tim: this.namaTimB,
              score: this.playerB
            }
          ]
        });
        window.clearInterval(this.ticker);
        this.currentTimer = 0;
        this.formattedTimer = "00:00:00";
        this.timerState = "stoped";
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
        alert(this.B + " is Win !");
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
        this.timerState = "stoped";
        this.counterBola = 0;
        this.playerA = 0;
        this.playerB = 0;

        this.ScoreTimB++;

        console.log("Ronde :", this.set);
      }
    },
    isMenangPertandinganA(val) {
      if (val) {
        alert("The Winner is Team " + this.namaTimA + " (" + this.A + ")");
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
          title: "Congratulations ! Team " + this.namaTimA + " (" + this.A + ")"
        });
        this.tim.push(
          {
            tim: this.namaTimA,
            pemain: this.A
          },
          { tim: this.namaTimB, pemain: this.B }
        );
        this.scoreTim.push({
          scoreTimA: this.ScoreTimA,
          scoreTimB: this.ScoreTimB
        });
        localStorage.setItem("scoreTim", JSON.stringify(this.scoreTim));
        localStorage.setItem("set", JSON.stringify(this.set));
        localStorage.setItem("tim", JSON.stringify(this.tim));
        localStorage.setItem("partai", JSON.stringify(this.partai));
        this.$router.push("/start/resultSingle");
      }
    },
    isMenangPertandinganB(val) {
      if (val) {
        alert("The Winner is Team " + this.namaTimB + " (" + this.B + ")");
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
          title: "Congratulations! Team " + this.namaTimB + " (" + this.B + ")"
        });
        this.tim.push(
          {
            tim: this.namaTimA,
            pemain: this.A
          },
          { tim: this.namaTimB, pemain: this.B }
        );
        this.scoreTim.push({
          scoreTimA: this.ScoreTimA,
          ScoreTimB: this.ScoreTimB
        });
        localStorage.setItem("scoreTim", JSON.stringify(this.scoreTim));
        localStorage.setItem("set", JSON.stringify(this.set));
        localStorage.setItem("tim", JSON.stringify(this.tim));
        localStorage.setItem("partai", JSON.stringify(this.partai));
        this.$router.push("/start/resultSingle");
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
