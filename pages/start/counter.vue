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
          <b-col>{{ isDeuce ? "Deuce" : "Bukan" }}</b-col>
        </b-row>

        <b-row>
          <b-col>isBolaA : {{ isBolaA }} || isBolaB : {{ isBolaB }}</b-col>
          <b-col>{{ status }}</b-col>
          <b-col>counterBola : {{ counterBola }}</b-col>
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
      counterBola: 0,
      keputusan: ""
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
      return `si ${orang} servis dari ${posisi}`;
    }
  },
  watch: {
    isDeuce(val) {
      if (val) {
        alert("deuce!!");
      }
    }
  },
  methods: {
    tambahplayerA() {
      this.playerA++;

      if (this.isBolaB) {
        this.counterBola++;
      }
    },
    tambahplayerB() {
      this.playerB++;

      if (this.isBolaA) {
        this.counterBola++;
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