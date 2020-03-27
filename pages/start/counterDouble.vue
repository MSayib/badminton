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
            <b-card
              border-variant="dark"
              header="Player A1 / Player A2"
              align="center"
            >
              <b-card-text class="scoreBoard">{{ playerA }}</b-card-text>
            </b-card>
          </b-col>
          <b-col cols="4" style="margin-top: 40px">
            <b-img :src="img" width="90%" fluid alt="Responsive image" />
          </b-col>
          <b-col>
            <b-card
              border-variant="dark"
              header="Player B1 / Player B2"
              align="center"
            >
              <b-card-text class="scoreBoard">{{ playerB }}</b-card-text>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col>isKananA {{ isKananA }} || isKananB {{ isKananB }}</b-col>
          <b-col>{{ status }}</b-col>
          <b-col>isServeA :{{ isServeA }} isServeB:{{ isServeB }}</b-col>
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
      isServeA: 0,
      isServeB: 0
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
    isMenangA(){
      if (this.playerA >= 21){
        if (this.playerA >= this.playerB + 2){
          return true
        }else if(this.playerA === 30){
          return true
        }     
      }
    },
    isMenangB(){
      if (this.playerB >= 21){
        if(this.playerB >= this.playerA +2){
          return true
        }else if(this.playerB === 30){
          return true
        }
      }
    },
    status() {
      const teamAServe = this.isServeA % 2 === 0 ? "A1" : "A2";
      const skorGenapA = teamAServe ? this.playerA : "";
      const posisiA = skorGenapA % 2 === 0 ? "Kanan" : "Kiri";

      const teamBServe = this.isServeB % 2 === 1 ? "B1" : "B2";
      const skorGenapB = teamBServe ? this.playerB : "";
      const posisiB = skorGenapB % 2 === 0 ? "Kanan" : "Kiri";

      return `Pemain ${teamAServe} serve di posisi ${posisiA}`;
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
    isMenangA(val){
      if (val){
        alert("Tim A Menang!")
      }
    },
    isMenangB(val){
      if (val){
        alert("Tim B Menang")
      }
    },
    playerA() {
      if (this.isKananA && !this.isKananB) {
        return;
      } else if (!this.isKananA && !this.isKananB) {
        this.isServeB++;
      } else if (this.isKananA && this.isKananB) {
        this.isServeB++;
      }
    },
    playerB() {
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
